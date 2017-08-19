import {Component, OnInit, Input, Output, OnDestroy} from '@angular/core';
import { EventEmitter} from '@angular/core';
import { Script } from '../script';
import { Http } from '@angular/http';
import {ScriptsService} from '../scripts.service';
import {Observable} from 'rxjs/Observable';

 @Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit, OnDestroy {

  @Input() script: Script;
  @Output() close = new EventEmitter();

  className: string;
  classList = ['grid-item--width3', 'grid-item--width2', 'grid-item--height2'];
  intervalFn = Observable.interval(5000);
   timer: any;

  constructor(private http: Http, private scriptsService: ScriptsService) {
    const randomClass = Math.round(Math.random() * 10) % 2;
    this.className = this.classList[randomClass];
  }
  ngOnInit() {

    this.getScript();
    // this.intervalFn.subscribe(x =>
    //   this.getScript()
    // );

    this.timer = setInterval(_ => {
      this.getScript();
    }, 5000);
  }
    ngOnDestroy() {

    }

   closeTheScript(event, scriptCode) {
     event.target.parentElement.parentElement.parentElement.parentElement.remove();
     clearInterval(this.timer);
     //this.close.emit(null);
     event.preventDefault();
   }

   getScript() {
     this.scriptsService.getData(this.script.code).subscribe(data => {
       this.script = this.scriptsService.getScriptDetails(data, this.script);
     });
   }

}
