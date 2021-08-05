import { motorcycle } from "./motorcycle.class";
import { ticket } from "./ticket.class";
export class motorcycleTicket extends ticket {
  name:string
  id!: string ;
  price: motorcycle;
  constructor() {
    super();
    this.price = new motorcycle();
    this.name = "motorcycle";
  }
}
