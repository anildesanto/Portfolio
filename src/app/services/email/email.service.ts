import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { merge, Observable, throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  public clientSideErrorMessage = 'The request could not be processed - Client side';
  
  constructor(private http: HttpClient, private recaptchaV3Service: ReCaptchaV3Service ) {
  }

  public sendEmail(body: Object): Observable<any> {
    return merge(this.executeRecaptcha('senEmail'), this.postEmail(body));
  }

   public postEmail(body: Object): Observable<any> {
    return this.http.post<any>(environment.emailApi, body, this.requestOptions);
  }

  public executeRecaptcha(action: string): Observable<string> {
    return this.recaptchaV3Service.execute(action);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(this.clientSideErrorMessage);
    } else {
      return throwError(error);
    }
  }

  private get requestOptions() {
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*'
    };
    return { headers: headers };
  }
}
