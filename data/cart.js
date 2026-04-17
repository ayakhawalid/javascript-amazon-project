export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2}
];

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
