import { ShapeService } from './services/shape.service';
import { EventHandlerService } from './services/event-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TagitToolComponent } from './tagit-tool/tagit-tool.component';
import { CanvasComponent } from './tagit-tool/canvas/canvas.component';
import { ToolbarComponent } from './tagit-tool/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';




@NgModule({
  declarations: [
    AppComponent,
    TagitToolComponent,
    CanvasComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [EventHandlerService , ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
