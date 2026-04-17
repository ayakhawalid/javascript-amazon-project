export const cart = [];

export function addToCart(productId, quantity)
{
  let found = false;
  cart.forEach((cartItem)=>
  {
    if(cartItem.productId===productId)
    {
      cartItem.quantity+=quantity;
      found = true;
    }
  })
  if(!found)
    cart.push({productId, quantity});
}
