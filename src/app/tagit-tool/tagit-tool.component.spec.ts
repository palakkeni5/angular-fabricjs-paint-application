import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagitToolComponent } from './tagit-tool.component';

describe('TagitToolComponent', () => {
  let component: TagitToolComponent;
  let fixture: ComponentFixture<TagitToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagitToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagitToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
