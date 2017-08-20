import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit, OnChanges {

  @Input() scriptName: String;
  @Output() suggestionSelect = new EventEmitter<String>();

  suggestionList: any;
  showSuggestion: boolean;
  results: any;

  constructor(private http: HttpClient) {
    this.suggestionList = [];
  }

  ngOnInit(): void {
    // Make the HTTP request:

  }


  ngOnChanges() {
    this.suggestionList = [];
    this.showSuggestion = false;
    if (this.scriptName) {
      this.getDataFromNasdaq();
    }
  }

  selectSuggestion(event) {
    this.showSuggestion = false;
    this.suggestionSelect.emit(event.target.textContent);
  }

  fomatDtata(crudeStr) {

    const str = crudeStr.split('\n');
    const codeList = this.getScriptCodes();

    for ( const item of str){
      if (!item ) {
        continue;
      }
      const shortScript = item.split(';');
      const shortScript1 = shortScript[0].split('|');

      if (codeList.indexOf(shortScript1[0].trim()) !== -1 ) {
        continue;
      }

      // this.suggestionList.push(shortScript1[1] + '( ' + shortScript1[0] + ')');
      if (this.suggestionList.length < 10 ) {
        this.suggestionList.push(shortScript[0]);
      }

    }

    this.showSuggestion = this.suggestionList.length > 0 ? true : false ;

  }

  getDataFromNasdaq() {


    this.http.get('http://www.nasdaq.com/aspx/symbolnamesearch.aspx?q=' + this.scriptName, {responseType: 'text'}).subscribe(

      // Successful responses call the first callback.
      data => {
        if (data) {
          this.fomatDtata(data);
        }
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      }
    );

    // this.http
    //   .get<MyJsonData>('http://www.nasdaq.com/aspx/symbolnamesearch.aspx?q=' + this.scriptName, {observe: 'response'})
    //   .subscribe(resp => {
    //     // Here, resp is of type HttpResponse<MyJsonData>.
    //     // You can inspect its headers:
    //     console.log(resp.headers.get('X-Custom-Header'));
    //     // And access the body directly, which is typed as MyJsonData as requested.
    //     console.log(resp.body.someField);
    //   });
  }

  getScriptCodes() {

    const data = localStorage.getItem('stock-dashboard');
    let codeList = new Array();
    if (data) {
      const jsonData = JSON.parse(data);
      for (let _i = 0; _i < jsonData.length; _i++) {
        const script = jsonData[_i];
        codeList.push(script.code.trim());
      }
    }
    return codeList;
  }

}
