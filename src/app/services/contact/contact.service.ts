import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of, throwError } from 'rxjs';
import { Message } from 'src/app/models/contact/message';
import { Sender } from 'src/app/models/contact/sender';
import { environment } from 'src/environments/environment';
import { PortfolioService } from '../portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private recaptchaV3Service: ReCaptchaV3Service,
    private portfolioService: PortfolioService) { }


  private readonly INBOX_COLLECTION = 'inbox';
  private readonly MESSAGES_COLLECTION = 'messages';
  private readonly ORDER_BY_DATE = 'date';
  private readonly ORDER_TYPE_ASC = 'asc';
  private readonly CLIENT_SIDE_ERROR_MESSAGE = 'The request could not be processed - Client side';

  public createUserChatRoom(sender: Sender): Observable<any> {
    return of(this.portfolioService.getUser()
      .collection(this.INBOX_COLLECTION)
      .doc(sender.email.toLowerCase())
      .set(JSON.parse(JSON.stringify(sender))));
  }

  public sendMessagge(chatId: string, message: Message): Observable<any> {
    return of(this.portfolioService.getUser()
      .collection(this.INBOX_COLLECTION)
      .doc(chatId.toLowerCase())
      .collection(this.MESSAGES_COLLECTION)
      .add(JSON.parse(JSON.stringify(message))));
  }

  public getChat(chatId: string): AngularFirestoreCollection<Message> {
    return this.portfolioService.getUser()
      .collection(this.INBOX_COLLECTION)
      .doc(chatId)
      .collection(this.MESSAGES_COLLECTION, ref => ref.orderBy(this.ORDER_BY_DATE, this.ORDER_TYPE_ASC));
  }

  public postEmail(body: Object): Observable<any> {
    return this.http.post<any>(environment.api.url, body, this.requestOptions);
  }

  public executeRecaptcha(action: string): Observable<string> {
    return this.recaptchaV3Service.execute(action);
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(this.CLIENT_SIDE_ERROR_MESSAGE);
    } else {
      return throwError(error);
    }
  }

  private get requestOptions() {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${environment.api.key}`,
      'Content-Type': 'application/json'
    };
    return { headers: headers };
  }
}
