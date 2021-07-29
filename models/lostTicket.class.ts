import { ticket } from "./ticket.class";
export class lostTicket extends ticket {
  id!: string;
  price: number = 0;
  constructor() {
    super();
  }
}
