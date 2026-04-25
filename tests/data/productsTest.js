import {Product, Appliance, Clothing, products} from "../../data/products.js";
import formatCurrency from "../../scripts/utils/money.js";


describe('test suite: Product class', ()=>{
  let product;
  beforeEach(()=>{
    product = new Product({
      id: "id1",
      image: "images/products/backpack.jpg",
      name: "Comfortable School Backpack",
      rating: {
        stars: 4.5,
        count: 50
      },
      priceCents: 3000
    });
  });
  it('constructor test',()=>{
    
    expect(product.id).toEqual('id1');
    expect(product.image).toEqual('images/products/backpack.jpg');
    expect(product.name).toEqual('Comfortable School Backpack');
    expect(product.rating.stars).toEqual(4.5);
    expect(product.rating.count).toEqual(50);
    expect(product.priceCents).toEqual(3000);
  });
  it('getStarsUrl() test',()=>{
    expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars*10}.png`);
  });
  it('getPrice() test',()=>{
    expect(product.getPrice()).toEqual(`$${formatCurrency(product.priceCents)}`);
  });
  it('extraInfoHTML() test',()=>{
    expect(product.extraInfoHTML()).toEqual('');
  });
});

describe('test suite: Clothing class', ()=>{
  let product;
  beforeEach(()=>{
    product = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  })
  it('constructor test',()=>{
    expect(product.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });
  it('extraInfoHTML() test',()=>{
    /*expect(product.extraInfoHTML()).toEqual(`
    <a href="${product.sizeChartLink}" target="_blank">Size chart</a>
    `);*/
    expect(product.extraInfoHTML()).toContain(product.sizeChartLink);
  });
});

describe('test suite: Appliance class', ()=>{
  let product;
  beforeEach(()=>{
    product = new Appliance({
      id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
      image: "images/products/countertop-blender-64-oz.jpg",
      name: "Countertop Blender - 64oz, 1400 Watts",
      rating: {
        stars: 4,
        count: 3
      },
      priceCents: 10747,
      type: "appliance",
      instructionsLink:'images/appliance-instructions.png',
      warrantyLink:'images/appliance-warranty.png'
    });
  });
  it('constructor test',()=>{
    expect(product.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(product.warrantyLink).toEqual('images/appliance-warranty.png');
  });
  it('extraInfoHTML() test',()=>{
    /*expect(product.extraInfoHTML()).toEqual(`
    <a href="${product.instructionsLink}" target="_blank">Instructions</a>
    <a href="${product.warrantyLink}" target="_blank">Warranty</a>
    `);*/
    expect(product.extraInfoHTML()).toContain(product.instructionsLink);
    expect(product.extraInfoHTML()).toContain(product.warrantyLink);
  });

});