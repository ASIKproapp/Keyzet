-- Function to add items to cart
create or replace function add_to_cart(user_id uuid, product_id uuid, quantity int)
returns json
language plpgsql
security definer set search_path = public
as $$
declare
  cart_record record;
  cart_id uuid;
  product_record record;
  result json;
begin
  -- Check if product exists and has stock
  select * into product_record from products where id = product_id and stock >= quantity and is_active = true;
  if not found then
    return json_build_object('success', false, 'message', 'Product not available or insufficient stock');
  end if;

  -- Get or create cart for user
  select * into cart_record from carts where user_id = add_to_cart.user_id;
  if not found then
    insert into carts (user_id) values (add_to_cart.user_id) returning * into cart_record;
  end if;
  
  cart_id := cart_record.id;

  -- Check if item already in cart
  if exists (select 1 from cart_items where cart_id = cart_id and product_id = add_to_cart.product_id) then
    -- Update quantity
    update cart_items 
    set quantity = quantity + add_to_cart.quantity 
    where cart_id = cart_id and product_id = add_to_cart.product_id;
  else
    -- Insert new item
    insert into cart_items (cart_id, product_id, quantity) 
    values (cart_id, add_to_cart.product_id, add_to_cart.quantity);
  end if;

  -- Return success
  return json_build_object('success', true, 'message', 'Item added to cart');
end;
$$;