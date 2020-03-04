import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tagit-tool',
  templateUrl: './tagit-tool.component.html',
  styleUrls: ['./tagit-tool.component.css']
})
export class TagitToolComponent implements OnInit {

  imageDataURL = 'assets/background.jpeg';
  constructor() { }

  ngOnInit() {
  }

}
