import { products, getProduct, loadProductsFetch } from "../data/products.js";
import { getOrder, getProductInOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

async function rendertTrackingHTML(){

  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const order = getOrder(orderId);
  const productInOrder = getProductInOrder(orderId, productId);
  const product = getProduct(productId);
  const today=dayjs();
  const orderTime=dayjs(order.orderTime);
  const deliveryTime = dayjs(productInOrder.estimatedDeliveryTime);
  const progressPercent = ((today.diff(orderTime, 'day'))/dayjs(deliveryTime).diff(orderTime, 'day'))*100;
  console.log(progressPercent);
  
  document.querySelector('.js-order-tracking').innerHTML=`
  <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
          </a>
  
          <div class="delivery-date ">
            Arriving on ${dayjs(productInOrder.estimatedDeliveryTime).format('dddd, MMMM D')}
          </div>
  
          <div class="product-info">
            ${product.name}
          </div>
  
          <div class="product-info">
            Quantity: ${productInOrder.quantity}
          </div>
  
          <img class="product-image" src=${product.image}>
  
          <div class="progress-labels-container">
            <div class="progress-label js-preparing">
              Preparing
            </div>
            <div class="progress-label js-shipped">
              Shipped
            </div>
            <div class="progress-label js-delivered">
              Delivered
            </div>
          </div>
  
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${progressPercent}%"></div>
          </div>
  `;

  if(progressPercent<=49)
  {
    document.querySelector('.js-preparing').classList.add('current-status');
  }
  else if(progressPercent>99)
  {
    document.querySelector('.js-delivered').classList.add('current-status');
  }
  else
  {
    document.querySelector('.js-shipped').classList.add('current-status');
  }
  
}
rendertTrackingHTML();

