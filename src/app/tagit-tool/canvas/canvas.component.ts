import { EventHandlerService } from './../../services/event-handler.service';
import { CustomFabricObject } from './../../classes/model';


import { fabric } from 'fabric';
import { AfterContentInit, AfterViewInit, Component, Input, NgZone, HostListener } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterContentInit, AfterViewInit {
  canvas: fabric.Canvas;
  private isAnyObjectSelected : boolean =false
  private selectedObjectData : CustomFabricObject = undefined

  @HostListener('window:keydown',['$event'])
  keyEvent(event:KeyboardEvent){
    if(event.code == "Delete" && this.isAnyObjectSelected == true){
      // console.log("object is deleted")
      if(this.selectedObjectData!=undefined){this.eventHandler.removeObject(this.selectedObjectData)}
    }
  }

  @Input() set imageDataURL(v: string) {
    if (v) {
      this.eventHandler.imageDataUrl = v;
    }
  }

  constructor(private eventHandler: EventHandlerService, private ngZone: NgZone) { }


  ngAfterContentInit() {
    this.ngZone.runOutsideAngular(() => {
      if (this.eventHandler.canvas) {
        this.eventHandler.canvas.dispose();
      }
      this.canvas = new fabric.Canvas('canvas', {
        selection: false,
        preserveObjectStacking: true,
      });
      this.eventHandler.canvas = this.canvas;
      this.eventHandler.extendToObjectWithId();
      fabric.Object.prototype.objectCaching = false;
      this.addEventListeners();
    });
  }

  ngAfterViewInit() {
    this.eventHandler.addBGImageSrcToCanvas();
  }

  private addEventListeners() {
    this.canvas.on('mouse:down', e => this.ngZone.run(() => this.onCanvasMouseDown(e)));
    this.canvas.on('mouse:move', e => this.ngZone.run(() => this.onCanvasMouseMove(e)));
    this.canvas.on('mouse:up', () => this.ngZone.run(() => this.onCanvasMouseUp()));
    this.canvas.on('selection:created', e => this.ngZone.run(() => this.onSelectionCreated(e as any)));
    this.canvas.on('selection:updated', e => this.ngZone.run(() => this.onSelectionUpdated(e as any)));
    this.canvas.on('selection:cleared',e => this.ngZone.run(() => this.onSelectionCleared()))
    this.canvas.on('object:moving', e => this.ngZone.run(() => this.onObjectMoving(e as any)));
    this.canvas.on('object:scaling', e => this.ngZone.run(() => this.onObjectScaling(e as any)));
  }

  private onCanvasMouseDown(event: { e: Event }) {
    this.eventHandler.mouseDown(event.e);
    this.avoidDragAndClickEventsOfOtherUILibs(event.e);
  }
  private onCanvasMouseMove(event: { e: Event }) {
    this.eventHandler.mouseMove(event.e);
  }
  private onCanvasMouseUp() {
    this.eventHandler.mouseUp();
  }
  private onSelectionCreated(e: { target: CustomFabricObject }) {
    // console.log("selection created was called" )
    this.isAnyObjectSelected=!this.isAnyObjectSelected
    this.selectedObjectData = e.target
    this.eventHandler.objectSelected(e.target);
  }
  private onSelectionUpdated(e: { target: CustomFabricObject }) {
    // console.log("selection updated was called")
    this.selectedObjectData = e.target
    this.eventHandler.objectSelected(e.target);
  }
  private onObjectMoving(e: any) {
    this.eventHandler.objectMoving(e.target.id, e.target.type, e.target.left, e.target.top);
  }
  private onObjectScaling(e: any) {
    this.eventHandler.objectScaling(
      e.target.id,
      e.target.type,
      { x: e.target.scaleX, y: e.target.scaleY },
      { left: e.target.left, top: e.target.top },
    );
  }

  private onSelectionCleared(){
    this.isAnyObjectSelected=!this.isAnyObjectSelected
    this.selectedObjectData=undefined
    // console.log("selection cleared was called")
  }

  private avoidDragAndClickEventsOfOtherUILibs(e: Event) {
    e.stopPropagation();
  }

}
