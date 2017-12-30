import { MatButtonModule } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loc-trans-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    // Prevent browser default drag&drop behavior
    window.addEventListener("dragover", e => {
      e && e.preventDefault();
    }, false);
    window.addEventListener("drop", e => {
      e && e.preventDefault();
    }, false);
  }

}
