import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader()
{
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-header-checkout-quantity').innerHTML=`${cartQuantity} items`;
}