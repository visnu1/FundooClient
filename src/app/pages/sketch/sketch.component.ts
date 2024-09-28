import { AfterViewInit, Component, ElementRef, OnInit, viewChild } from '@angular/core';
import * as fabric from 'fabric';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss']
})
export class SketchComponent implements OnInit, AfterViewInit {

  canvasEle = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  canvas: fabric.Canvas;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.canvasEle() && this.canvasEle().nativeElement.getContext)
      this.initFabricJS();
  }

  initFabricJS() {
    // this.canvas = new fabric.Canvas('canvas', {
    //   // width: 700,
    //   height: 900,
    //   backgroundColor: 'azure',
    // });
    // this.canvas.isDrawingMode = true;
  }

  adjustCanvasDimensions() {

  }

}
