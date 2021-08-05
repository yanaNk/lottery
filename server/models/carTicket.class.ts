import { car } from './car.class';
import { ticket } from './ticket.class';
export class carTicket extends ticket{
    name:string
    id!: string;
    price : car;
    constructor(){
        super();
        this.name = "car";
        this.price = new car();
    }
}