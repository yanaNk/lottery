import { ticket } from './ticket.class';
export class cashTicket extends ticket{
    id!: string;
    price : number = 1000;
    constructor(){
        super();
    }
}