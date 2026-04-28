import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { products, getProduct } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "./amazon.js";


async function renderOrdersHTML(){

  await loadProductsFetch();
  updateCartQuantity();

  orders.forEach((order)=>{
    document.querySelector('.js-orders-grid').innerHTML+=
    `
    <div class="order-container js-order-container">
              
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${dayjs(order.orderTime).format('MMMM D')}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>
  
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>
              <div class="order-details-grid js-order-details-grid-${order.id}"></div></div>`;

            order.products.forEach((product)=>{
              document.querySelector(`.js-order-details-grid-${order.id}`).innerHTML+=
              `
                <div class="product-image-container">
                  <img src="${getProduct(product.productId).image}">
                </div>
  
                <div class="product-details">
                  <div class="product-name">
                  ${getProduct(product.productId).name}
                  </div>
                  <div class="product-delivery-date">
                    Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${product.quantity}
                  </div>
                  <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message js-buy-again" data-product-id="${product.productId}" data-quantity="${product.quantity}">Buy it again</span>
                  </button>
                </div>
  
                <div class="product-actions">
                    <button class="track-package-button button-secondary js-track-package" data-product-id="${product.productId}" 
                    data-order-id="${order.id}">
                      Track package
                    </button>
                </div>
              `;
            });         
  }); 
}

await renderOrdersHTML();

document.querySelectorAll('.js-buy-again').forEach((button)=>{
    button.addEventListener('click', ()=>
      {
        const {productId, quantity} = button.dataset;
        addToCart(productId, Number(quantity));
        
      });
  });

document.querySelectorAll('.js-track-package').forEach((button)=>{
    button.addEventListener('click',()=>{
      const {productId, orderId} = button.dataset;
      window.location.href=`tracking.html?orderId=${orderId}&productId=${productId}`;
    });
});