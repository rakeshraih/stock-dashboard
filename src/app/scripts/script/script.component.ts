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
  @Output() showOverLay = new EventEmitter();
  @Output() lastRefreshedToParent = new EventEmitter();

  className: string;
   classList = ['grid-item--width2 grid-item--height2', 'grid-item--width3', 'grid-item--height2', 'grid-item--width2 grid-item--height3', 'grid-item', 'grid-item--width2'];
  intervalFn = Observable.interval(5000);
  timer: any;
  classPriceChnage: String = '';
  pageVisible: Boolean = true;

  constructor(private http: Http, private scriptsService: ScriptsService) {
    const randomClass = Math.round(Math.random() * 10) % 7;
    this.className = 'grid-item grid-item--height2 container-layout ' + this.classList[randomClass];
  }
  ngOnInit() {

    this.getScript();
    // this.intervalFn.subscribe(x =>
    //   this.getScript()
    // );

    this.timer = setInterval(_ => {
      if ( this.pageVisible) {this.getScript(); }
    }, 60000);

    this.classPriceChnage =  ( this.script.previousClose < this.script.close ) ? 'green' : 'red';
    this.addLocalStorageScript();

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        this.pageVisible = false;
      } else {
        this.pageVisible = true;
      }
    });
    }
    ngOnDestroy() {

    }

   closeTheScript(event, scriptCode) {
     event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
     clearInterval(this.timer);
     //this.close.emit(null);
     this.deleteLocalStorageScript();
     event.preventDefault();
   }

   getScript() {
     this.scriptsService.getData(this.script.code).subscribe(data => {
       this.script = this.scriptsService.getScriptDetails(data, this.script);
       this.lastRefreshedToParent.emit( this.script.lastRefreshed);
     });
   }

   expandView($event) {
      const expandView = this.className.match('position-center') != null;
      this.className = expandView ? this.className.replace('position-center','') : this.className + ' position-center';
     this.showOverLay.emit(!expandView);
      $event.preventDefault();
   }

   public chartClicked(e:any):void {
     console.log(e);
   }

   public chartHovered(e:any):void {
     console.log(e);
   }

   addLocalStorageScript() {
     const data = localStorage.getItem('stock-dashboard');
     let jsonData = new Array();
     const script = {'code': this.script.code.trim(), 'name' : this.script.name.trim(), 'scriptFullName' : this.script.scriptFullName}

     if (this.checkDataExist() !== -1) {
       return ;
     }

     if (data) {
       jsonData = JSON.parse(data);
       jsonData.push(script);
     }else {
       jsonData.push(script);
     }
     localStorage.setItem('stock-dashboard', JSON.stringify(jsonData));
   }

   deleteLocalStorageScript() {
     const data = localStorage.getItem('stock-dashboard');
     let jsonData: any;
     if (data) {
       jsonData = JSON.parse(data);
           jsonData.splice(this.checkDataExist(), 1);
       }
     localStorage.setItem('stock-dashboard', JSON.stringify(jsonData));
   }

   checkDataExist() {

     const data = localStorage.getItem('stock-dashboard');
     if (data) {
       const jsonData = JSON.parse(data);
       for (let _i = 0; _i < jsonData.length; _i++) {
         const script = jsonData[_i];
         if (script.code === this.script.code) {
             return _i;
         }
       }
     }
     return -1;
   }

   drop(ev) {
    //alert(1);
     ev.preventDefault();
     const data = ev.dataTransfer.getData('text');
     //ev.target.appendChild(document.getElementById(data));
     //ev.currentTarget.parentNode.parentNode.prepend(document.getElementById(data));

     ev.currentTarget.parentNode.parentNode.parentNode.insertBefore(document.getElementById(data).parentNode.parentNode, ev.currentTarget.parentNode.parentNode.nextSibling);


   }

   drag(ev) {
     ev.dataTransfer.setData('text', ev.target.id);
   }

   allowDrop(ev) {
     //alert(1);
     ev.preventDefault();
   }
}
