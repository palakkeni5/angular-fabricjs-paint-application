import { EventHandlerService } from './../../services/event-handler.service';
import { DrawingTools } from './../../classes/model';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  DrawingTools = DrawingTools;
  selected = this.fabricService.selectedTool;

  constructor(private fabricService: EventHandlerService) {}

  async select(tool: DrawingTools) {
    this.fabricService.selectedTool = tool;
    this.selected = this.fabricService.selectedTool;
  }

  

}
