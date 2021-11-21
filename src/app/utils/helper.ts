import { Injectable } from "@angular/core";
@Injectable()
export class Helper {
  title = 'portfolio';
  name = 'Anilde Santo';
  occupation = 'Software Engineer';
  base = 'Milton Keynes, UK';
  intro = `${this.name}, ${this.occupation}  based in ${this.base}`;
}
