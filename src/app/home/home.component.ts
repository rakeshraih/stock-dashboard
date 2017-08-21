import { Component, OnInit } from '@angular/core';
import { Script } from '../scripts/script';
import { HttpClient } from '@angular/common/http';
import { ScriptsService } from '../scripts/scripts.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  scriptName: String;
  scriptCode: String;
  scriptsList: any;
  searching = '';
  constructor(private http: HttpClient, private scriptsService: ScriptsService) {
    // this.scriptName = 'test';
    // this.scriptCode = 'MSFT';
    this.scriptsList = [];
    this.getScriptListFromLocal();
  }

  ngOnInit() {
  }

  showForm($event) {

  }

  keyUpInput($event) {
  }

  addScript(event) {

    this.searching = 'search-request';
    if (this.scriptCode) {
      const script = new Script();
      script.code = this.scriptCode;
      script.name = this.scriptName.trim().split(' ')[0] + '(' + this.scriptCode.trim() + ')';

      // this.scriptsService.getData(this.scriptCode).subscribe(data => {
      //   this.scriptsList.push(this.scriptsService.getScriptDetails(data, script));
      // });
      this.scriptsList.push(script);
    }
    this.clearForm(event);
  }

  suggestionSelect(suggestion: String) {
    const scriptData = suggestion.split('|');
    this.scriptCode = scriptData[0];
    this.scriptName = scriptData[1];
  }

  clearForm($event) {
    this.scriptName = '';
  }

  getScriptListFromLocal() {
    const data = localStorage.getItem('stock-dashboard');
    if (data) {
      const jsonData = JSON.parse(data);
      this.scriptsList = ( jsonData.length > 0 ) ? jsonData :  [{'code' : 'AAPL', 'name' : 'Apple(AAPL)'}, {'code' : 'GOOG', 'name' : 'Alphabet(GOOG)'}, {'code' : 'COST', 'name' : 'Costco(COST)'}, {'code' : 'AMZN', 'name' : 'Amazon.com,(AMZN)'}, {'code' : 'TSLA', 'name' : 'Tesla,(TSLA)'}, {'code' : 'F', 'name' : 'Ford(F)'}, {'code' : 'V', 'name' : 'Visa(V)'}, {'code' : 'TWTR', 'name' : 'Twitter,(TWTR)'}, {'code' : 'NFLX', 'name' : 'Netflix,(NFLX)'}];
    }
  }

  randomize($event) {
    this.scriptsList = [];
    this.getScriptListFromLocal();
  }
}
