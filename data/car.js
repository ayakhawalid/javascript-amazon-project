class Car{
  #brand;
  #model;
  speed=0;
  isTrunkOpen=false;
  constructor(brand, model){
    this.#brand = brand;
    this.#model = model;
  }
  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${this.isTrunkOpen? `Open`: this.acceleration? `No trunk`: `Closed`}`);
  }
  go(){
    if(this.speed===200 || this.isTrunkOpen)
      return;
    this.speed += 5;
  }
  brake(){
    if(this.speed === 0)
      return;
    this.speed-=5;
  }
  openTrunk(){
    if(this.speed>0)
      return;
    this.isTrunkOpen=true;
  }
  closeTrunk(){
    this.isTrunkOpen=false;
  }
}

class RaceCar extends Car{
  acceleration;
  constructor(brand, model, acceleration){
    super(brand, model);
    this.acceleration=acceleration;
  }
  go(){
    if(this.speed===300)
      return;
    this.speed+=this.acceleration;
  }
  openTrunk(){
  }
  closeTrunk(){
  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');
car1.displayInfo();
car2.displayInfo();
car1.go(); 
car1.go();
car2.brake();
car1.displayInfo();
car2.displayInfo();
car1.openTrunk();
car2.openTrunk();
car1.displayInfo();
car2.displayInfo();
car2.go();
car2.displayInfo();

const car3 = new RaceCar('McLaren', 'F1', 20);
car3.go();
car3.go();
car3.openTrunk();
car3.displayInfo();