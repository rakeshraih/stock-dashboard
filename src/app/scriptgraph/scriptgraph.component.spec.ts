import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptgraphComponent } from './scriptgraph.component';

describe('ScriptgraphComponent', () => {
  let component: ScriptgraphComponent;
  let fixture: ComponentFixture<ScriptgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
