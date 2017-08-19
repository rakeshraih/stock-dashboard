import {Component, Input, OnInit, OnChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, OnDestroy } from '@angular/core';
import { ScriptComponent} from './script/script.component';
@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.scss']
})
export class ScriptsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() scriptsList;
  @ViewChild('scriptContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;
  showChild = true;
  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
  }

  ngOnChanges() {
      // alert(JSON.stringify(this.scriptsList));
  }

  createComponent(type) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(ScriptComponent);
    this.componentRef = this.container.createComponent(factory);
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

}
