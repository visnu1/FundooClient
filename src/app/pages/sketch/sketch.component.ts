import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FabricService } from './fabric.service';
import { ToolOptions } from '../../core/Models/sketch';
import { hexToRGB } from '../../core/utils/hex-to-rgb';

enum CanvasPageStyle {
  Square = 'square',
  Dots = 'dots',
  Rules = 'rules',
}
@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss'],
})
export class SketchComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasEle!: ElementRef<HTMLCanvasElement>;

  private fabric: any;
  private canvas: any;

  constructor(private _zone: NgZone, private _fabricService: FabricService) { }

  ngAfterViewInit(): void {
    if (this.canvasEle?.nativeElement?.getContext) {
      this.initFabricJS();
      this.adjustCanvasDimensions(); // Adjust dimensions on initialization // needs change by using observables
    } else {
      console.error('Canvas element not found or does not support 2D context');
    }
  }

  private async initFabricJS() {
    try {
      this.fabric = await this._fabricService.getFabricObject();
      this._zone.runOutsideAngular(() => {
        this.canvas = new this.fabric.Canvas(this.canvasEle.nativeElement, {
          backgroundColor: '#fafafa',
          selection: false,
          preserveObjectStacking: true,
        });
        this.canvas.isDrawingMode = true;
      });
    } catch (error) {
      console.error('Error initializing Fabric.js:', error);
    }
  }


  setCanvasBackgroundPattern(source: string, repeat: string = 'repeat') {
    this.canvas.setBackgroundColor(
      { source, repeat },
      this.canvas.renderAll.bind(this.canvas)
    );
  }

  canvasPageStyle(type: CanvasPageStyle | string) {
    switch (type) {
      case CanvasPageStyle.Square:
        this.setCanvasBackgroundPattern('assets/icons/pattern-square.svg');
        break;
      case CanvasPageStyle.Dots:
        this.setCanvasBackgroundPattern('assets/icons/pattern-dots.svg');
        break;
      case CanvasPageStyle.Rules:
        this.setCanvasBackgroundPattern('assets/icons/pattern-rules.svg');
        break;
      default:
        this.canvas.setBackgroundColor('#fafafa', this.canvas.renderAll.bind(this.canvas));
        break;
    }
  }


  adjustCanvasDimensions() {
    const canvasElement = this.canvasEle.nativeElement;
    if (canvasElement) {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
      this.canvas?.renderAll();
    }
  }


  private updateCanvasSettings(tool: string, options: ToolOptions) {
    const opacity = tool === 'highlighter' ? 0.2 : 1;
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.width = options.size;
    this.canvas.freeDrawingBrush.color = hexToRGB(options.shade, opacity);
  }


  onToolbarEvent(event: { action: string; selectedTool?: string; options?: ToolOptions }) {
    const action = event.action;
    if (!action) return;
    if (action === 'clearCanvas') this.canvas.clear();
    if (action === 'toolchange') this.updateCanvasSettings(event.selectedTool, event.options)
  }

}
