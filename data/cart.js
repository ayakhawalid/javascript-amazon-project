import { deliveryOptions } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage()
{
  cart =  JSON.parse(localStorage.getItem('cart')) || [];
}


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
    cart.push({productId, quantity, deliveryOptionId: '1'});

  saveToStorage();
}

export function removeFromCart(productId)
{
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId != productId)
      newCart.push(cartItem);
  })
  cart = newCart;

  saveToStorage();
}

function saveToStorage()
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity()
{
  let cartQuantity=0;
  cart.forEach((cartItem)=>
  {
    cartQuantity+=cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity)
{
  cart.forEach((cartItem)=>
  {
    if(cartItem.productId===productId)
    {
      cartItem.quantity = newQuantity;
    }
  });

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId)
{
  let found =false;
  deliveryOptions.forEach((deliveryOption)=>{
    if(deliveryOption.id===deliveryOptionId)
      found = true;
  });
  if(!found)
    return;
  
  found = false;
  cart.forEach((cartItem)=>
  {
    if(cartItem.productId===productId)
    {
      cartItem.deliveryOptionId=deliveryOptionId;
      found = true;
    }
  })
  if(!found)
    return;
  
  saveToStorage();
}

export function loadCart(fun)
{
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  console.log(await response.text());
}