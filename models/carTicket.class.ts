import { car } from './car.class';
import { ticket } from './ticket.class';
export class carTicket extends ticket{
    id: string;
    price : car;
    constructor(){
        super();
        this.price = new car();
    }
}