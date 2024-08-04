import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class SketchComponent {

  penShade?: string = '#ff5252';
  penSize?: number = 0.5657;
  markerShade?: string = '#d500f9';
  markerSize?: number = 0.5657;
  highlighterShade?: string = 'black';
  highlighterSize?: number = 0.5657;


}
