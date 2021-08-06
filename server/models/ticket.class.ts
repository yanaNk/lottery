import { v4 as uuid } from "uuid";
export abstract class ticket {
  id: string;
  purchaseDate: Date;
  isValidated: boolean;
  constructor() {
    this.id = uuid();
    this.purchaseDate = new Date(Date.now());
    this.isValidated = false;
  }
}
