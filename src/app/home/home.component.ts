import { Component, OnInit } from '@angular/core';
import { Script } from '../scripts/script';
import { HttpClient } from '@angular/common/http';
import { ScriptsService } from '../scripts/scripts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  scriptName: String;
  scriptCode: String;
  scriptsList: any;
  constructor(private http: HttpClient, private scriptsService: ScriptsService) {
    this.scriptName = 'test';
    this.scriptCode = 'MSFT';
    this.scriptsList = [];
  }

  ngOnInit() {
  }

  showForm($event) {

  }

  keyUpInput($event) {
  }

  addScript(event) {

    if (this.scriptCode) {
      const script = new Script();
      script.code = this.scriptCode;
      script.name = this.scriptName.trim().split(' ')[0] + '(' + this.scriptCode.trim() + ')';

      // this.scriptsService.getData(this.scriptCode).subscribe(data => {
      //   this.scriptsList.push(this.scriptsService.getScriptDetails(data, script));
      // });
      this.scriptsList.push(script);
    }
  }

  suggestionSelect(suggestion: String) {
    const scriptData = suggestion.split('|');
    this.scriptCode = scriptData[0];
    this.scriptName = scriptData[1];
  }

  clearForm() {
    this.scriptName = '';
  }
}
