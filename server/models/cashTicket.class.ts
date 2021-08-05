import { ticket } from './ticket.class';
export class cashTicket extends ticket{
    name:string;
    id!: string;
    price : number = 1000;
    constructor(){
        super();
        this.name = "cash";
    }
}