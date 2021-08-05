import { ticket } from "./ticket.class";
export class lostTicket extends ticket {
  name:string;
  id!: string;
  price: number = 0;
  constructor() {
    super();
    this.name = "lost";
  }
}
