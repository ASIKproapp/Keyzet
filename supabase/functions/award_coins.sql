-- Function to award coins for completed orders
create or replace function award_coins_for_order(user_id uuid, order_id uuid)
returns json
language plpgsql
security definer set search_path = public
as $$
declare
  order_record record;
  coins_to_award int;
  coin_transaction_exists boolean;
begin
  -- Check if order exists and is delivered
  select * into order_record 
  from orders 
  where id = order_id 
    and user_id = award_coins_for_order.user_id 
    and status = 'delivered';
  
  if not found then
    return json_build_object('success', false, 'message', 'Order not found or not delivered');
  end if;

  -- Check if coins already awarded for this order
  select exists (
    select 1 from coin_transactions 
    where user_id = award_coins_for_order.user_id 
      and source = 'order_' || order_id
  ) into coin_transaction_exists;
  
  if coin_transaction_exists then
    return json_build_object('success', false, 'message', 'Coins already awarded for this order');
  end if;

  -- Calculate coins (10 coins per $1 spent, capped at 1000 coins)
  coins_to_award := least(floor(order_record.total_amount * 10), 1000);
  
  -- Insert coin transaction
  insert into coin_transactions (user_id, source, coins)
  values (award_coins_for_order.user_id, 'order_' || order_id, coins_to_award);
  
  -- Update user's coin balance
  update profiles 
  set coins = coins + coins_to_award 
  where id = award_coins_for_order.user_id;

  -- Return success
  return json_build_object('success', true, 'message', 'Coins awarded', 'coins', coins_to_award);
end;
$$;