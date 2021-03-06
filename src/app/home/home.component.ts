import { Component, OnInit } from '@angular/core';
import { Script } from '../scripts/script';
import { HttpClient } from '@angular/common/http';
import { ScriptsService } from '../scripts/scripts.service';
import { CommonUtilityService} from "../common-utility.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  scriptName: String;
  scriptCode: String;
  scriptFullName: String;
  scriptsList: any;
  searching = '';
  overLayClass = false;
  lastRefreshed: String = '';
  demoTick: Boolean = true;
  defaultScriptList = [{'code' : 'AAPL', 'name' : 'Apple(AAPL)', 'scriptFullName' : 'Apple Inc.'}, {'code' : 'GOOG', 'name' : 'Alphabet(GOOG)', 'scriptFullName' : 'Alphabet Inc.'}, {'code' : 'COST', 'name' : 'Costco(COST)', 'scriptFullName' : ' Costco Wholesale Corporation'}, {'code' : 'AMZN', 'name' : 'Amazon.com,(AMZN)', 'scriptFullName' : ' Amazon.com, Inc.'}, {'code' : 'TSLA', 'name' : 'Tesla,(TSLA)', 'scriptFullName' : 'Tesla, Inc.'}, {'code' : 'F', 'name' : 'Ford(F)', 'scriptFullName' : 'Ford Motor Corporation'}, {'code' : 'V', 'name' : 'Visa(V)', 'scriptFullName' : 'Visa, Inc.'}, {'code' : 'TWTR', 'name' : 'Twitter,(TWTR)', 'scriptFullName' : 'Twitter, Inc.'}, {'code' : 'NFLX', 'name' : 'Netflix,(NFLX)', 'scriptFullName' : ' Netflix, Inc.'}
    , {'code' : 'COKE', 'name' : 'Coca-Cola Bottling Co(COKE)', 'scriptFullName' : 'Coca-Cola Bottling Co.'}, {'code' : 'WMT', 'name' : 'Wal-Mart Stores, Inc.(WMT)', 'scriptFullName' : 'Wal-Mart Stores, Inc.'}
    , {'code' : 'BAC', 'name' : 'Bank of America Corporation(BAC)', 'scriptFullName' : 'Bank of America Corporation'}
    , {'code' : 'INTC', 'name' : 'Intel Corporation(INTC)', 'scriptFullName' : 'Intel Corporation'}];

  constructor(private http: HttpClient, private scriptsService: ScriptsService, private common: CommonUtilityService) {
    // this.scriptName = 'test';
    // this.scriptCode = 'MSFT';
    this.scriptsList = [];
    this.getScriptListFromLocal();
    this.lastRefreshed = this.common.formatAMPM(new Date());
  }

  demoTickFn(): void {
    this.demoTick = !this.demoTick;
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
      script.scriptFullName = this.scriptFullName;
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
    this.scriptFullName = scriptData[1];
  }

  clearForm($event) {
    this.scriptName = '';
    setTimeout(function() {
      document.getElementById('script-input').focus();
    }, 500);
  }

  getScriptListFromLocal() {
    const data = localStorage.getItem('stock-dashboard');
    if (data) {
      const jsonData = JSON.parse(data);
      this.scriptsList = ( jsonData.length > 0 ) ? jsonData :  this.defaultScriptList;
    }else {
      this.scriptsList = this.defaultScriptList;
    }
  }

  randomize($event) {
    this.scriptsList = [];
    this.getScriptListFromLocal();
  }

  showOverLay(show: boolean) {
   this.overLayClass = show;
  }

  lastRefreshedTime(timeStamp: String) {
    //alert(timeStamp);
    this.lastRefreshed = timeStamp;
  }

  keyEntered(event) {

    if (event.keyCode === 40) {

      if (document.getElementsByClassName('tt-suggestion').length > 0) {

        if (document.getElementsByClassName('selection-highlight').length === 0) {
          document.getElementsByClassName('tt-suggestion')[0].classList.add('selection-highlight');
        }else {
          document.getElementsByClassName('tt-suggestion')[0].nextElementSibling.classList.add('selection-highlight');
          document.getElementsByClassName('selection-highlight')[0].classList.remove('selection-highlight');
        }

      }


    }else if (event.keyCode === 38) {

      event.currentTarget.classList.remove('selection-highlight');
      event.currentTarget.prev().classList.add('selection-highlight');

    }else if (event.keyCode === 13) {
      this.suggestionSelect(document.getElementsByClassName('selection-highlight')[0].firstElementChild.innerHTML);
    }

    //event.preventDefault();
  }
}
