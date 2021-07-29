import { motorcycle } from "./motorcycle.class";
import { ticket } from "./ticket.class";
export class motorcycleTicket extends ticket {
  id!: string ;
  price: motorcycle;
  constructor() {
    super();
    this.price = new motorcycle();
  }
}
