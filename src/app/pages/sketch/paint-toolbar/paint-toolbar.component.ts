import { Component } from '@angular/core';

@Component({
  selector: 'app-paint-toolbar',
  templateUrl: './paint-toolbar.component.html',
  styleUrl: './paint-toolbar.component.scss'
})
export class PaintToolbarComponent {

  penShade?: string = '#ff5252';
  penSize?: number = 0.5657;
  markerShade?: string = '#d500f9';
  markerSize?: number = 0.5657;
  highlighterShade?: string = 'black';
  highlighterSize?: number = 0.5657;

}
