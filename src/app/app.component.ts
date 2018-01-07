import { MatButtonModule } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { IconRegistryService } from './shared/services/icon-registry.service';

@Component({
  selector: 'loc-trans-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(iconService: IconRegistryService) { }
  
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
