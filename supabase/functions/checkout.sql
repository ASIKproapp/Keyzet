-- Function to handle checkout process
create or replace function checkout(user_id uuid, address_id uuid, payment_method text)
returns json
language plpgsql
security definer set search_path = public
as $$
declare
  cart_record record;
  cart_items_cursor refcursor;
  cart_item record;
  product_record record;
  order_id uuid;
  total_amount numeric := 0;
  order_item_price numeric;
begin
  -- Get user's cart
  select * into cart_record from carts where user_id = checkout.user_id;
  if not found then
    return json_build_object('success', false, 'message', 'Cart not found');
  end if;

  -- Check if cart has items
  if not exists (select 1 from cart_items where cart_id = cart_record.id) then
    return json_build_object('success', false, 'message', 'Cart is empty');
  end if;

  -- Check if address exists and belongs to user
  if not exists (select 1 from addresses where id = checkout.address_id and user_id = checkout.user_id) then
    return json_build_object('success', false, 'message', 'Invalid address');
  end if;

  -- Start transaction logic
  -- 1. Lock stock and check availability
  open cart_items_cursor for 
    select ci.*, p.price, p.stock 
    from cart_items ci 
    join products p on ci.product_id = p.id 
    where ci.cart_id = cart_record.id;
  
  loop
    fetch cart_items_cursor into cart_item;
    exit when not found;
    
    -- Check stock
    if cart_item.stock < cart_item.quantity then
      close cart_items_cursor;
      return json_build_object('success', false, 'message', 'Insufficient stock for ' || cart_item.product_id);
    end if;
    
    -- Calculate total
    order_item_price := cart_item.price * cart_item.quantity;
    total_amount := total_amount + order_item_price;
  end loop;
  
  close cart_items_cursor;

  -- 2. Create order
  insert into orders (user_id, address_id, total_amount, payment_method, status)
  values (checkout.user_id, checkout.address_id, total_amount, checkout.payment_method, 'pending')
  returning id into order_id;

  -- 3. Insert order items and reduce stock
  open cart_items_cursor for 
    select ci.*, p.price 
    from cart_items ci 
    join products p on ci.product_id = p.id 
    where ci.cart_id = cart_record.id;
  
  loop
    fetch cart_items_cursor into cart_item;
    exit when not found;
    
    -- Insert order item
    insert into order_items (order_id, product_id, price, quantity)
    values (order_id, cart_item.product_id, cart_item.price, cart_item.quantity);
    
    -- Reduce product stock
    update products 
    set stock = stock - cart_item.quantity 
    where id = cart_item.product_id;
  end loop;
  
  close cart_items_cursor;

  -- 4. Clear cart
  delete from cart_items where cart_id = cart_record.id;

  -- Return success with order ID
  return json_build_object('success', true, 'message', 'Order created successfully', 'order_id', order_id);
end;
$$;