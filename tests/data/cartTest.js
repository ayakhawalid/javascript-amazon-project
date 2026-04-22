import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";


describe('test suite: addToCart', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
  });

  it('adds a new product to the cart',()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);});
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('adds an existing product to the cart', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);});
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});

describe('test suite: removeFromCart', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);});
    loadFromStorage();
  });

  it('removes an existing product from the cart', ()=>{
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('removes non existing product from the cart', ()=>{
    removeFromCart('123456789');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});

describe('test suite: updateDeliveryOption', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);});
    loadFromStorage();
  });

  it('updates a delivery option for a product in the cart', ()=>{
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','2');
    expect(cart[0].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('updates a delivery option for a product that is not in the cart', ()=>{
    updateDeliveryOption('123456789','2');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('use a deliveryOptionId that does not exist', ()=>{
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','4');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});