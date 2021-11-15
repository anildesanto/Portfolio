import { Language } from './language';

export class User {
  base: string;
  firstName: string;
  lastName: string;
  occupation: string;
  profileText: string;
  experienceLink: string;
  languages: Array<Language>;
}
