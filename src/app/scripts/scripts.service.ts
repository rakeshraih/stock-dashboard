import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import { Script } from './script';

@Injectable()
export class ScriptsService {

  script: Script;
  showChild = true;
  constructor(private http: HttpClient) {
    this.script = new Script();
  }
  getScriptDetails(data, script: Script) {
    script.close = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['4. close']);
    script.open = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['1. open']);
    script.high = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['2. high']);
    script.low = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['3. low']);
    script.volume = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['5. volume']);
    script.lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    return script;
  }

  getData(scriptCode: String): Observable<any> {
    return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + scriptCode.trim() + '&interval=1min&apikey=37LTWXNDDNGGT2Z5')
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res;
    if ( res.hasOwnProperty('Error Message') ) {
      alert(res['Error Message']);
    }
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
