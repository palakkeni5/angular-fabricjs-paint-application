import { Component ,OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { fabric } from 'fabric';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mobileQuery: MediaQueryList;

  title = 'angular-fabricjs-implementation';
  
  canvas : fabric.Canvas;

  private _mobileQueryListener: () => void;


  ngOnInit(){

  }

  constructor(private ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher){
    this.addEventListeners();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private addEventListeners() {
    // this.canvas.on('mouse:down', e => this.ngZone.run(() => this.onCanvasMouseDown(e)));
    // this.canvas.on('mouse:move', e => this.ngZone.run(() => this.onCanvasMouseMove(e)));
    // this.canvas.on('mouse:up', () => this.ngZone.run(() => this.onCanvasMouseUp()));
    // this.canvas.on('selection:created', e => this.ngZone.run(() => this.onSelectionCreated(e as any)));
    // this.canvas.on('selection:updated', e => this.ngZone.run(() => this.onSelectionUpdated(e as any)));
    // this.canvas.on('object:moving', e => this.ngZone.run(() => this.onObjectMoving(e as any)));
    // this.canvas.on('object:scaling', e => this.ngZone.run(() => this.onObjectScaling(e as any)));
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  
}
