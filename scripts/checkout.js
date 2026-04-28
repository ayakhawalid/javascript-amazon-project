import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practice.js';

/*async function loadPage(){
  try{
    //throw 'error';
    console.log('load');
    await loadProductsFetch();
    await loadCartFetch();
  }
  catch(error){
    console.log('unexpected error, please try again later');
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}*/


async function loadPage(){
  await Promise.all([loadProductsFetch(), loadCartFetch()]);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
  

/*
new Promise((resolve)=>{
loadProducts(()=>{
  resolve('value1');
})
}).then((value)=>{
  console.log(value);

  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    })
  }).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
  
})
*/



