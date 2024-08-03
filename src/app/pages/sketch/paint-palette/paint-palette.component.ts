import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

const Colors1 = ["black", "#ff5252", "#ffbc00", "#00c853", "#00b0ff", "#d500f9", "#8d6e63"];
const Colors2 = ["#fafafa", "#a52714", "#ee8100", "#558b2f", "#01579b", "#8e24aa", "#4e342e"];
const Colors3 = ["#90a4ae", "#ff4081", "#ff6e40", "#aeea00", "#304ffe", "#7c4dff", "#1de9b6"];
const Colors4 = ["#cfd8dc", "#f8bbd0", "#ffccbc", "#f0f4c3", "#9fa8da", "#d1c4e9", "#b2dfdb"];

type Color = typeof Colors1[number] | typeof Colors2[number] | typeof Colors3[number] | typeof Colors4[number];

const BrushSizes = [
  { value: 0.2379, label: 'Size 1', dimension: '2px' },
  { value: 0.2931, label: 'Size 2', dimension: '4px' },
  { value: 0.4167, label: 'Size 3', dimension: '8px' },
  { value: 0.5657, label: 'Size 4', dimension: '12px' },
  { value: 0.7244, label: 'Size 5', dimension: '16px' },
  { value: 0.8878, label: 'Size 6', dimension: '20px' },
  { value: 1.0536, label: 'Size 7', dimension: '24px' },
  { value: 1.2209, label: 'Size 8', dimension: '28px' }
];


@Component({
  selector: 'app-paint-palette',
  templateUrl: './paint-palette.component.html',
  styleUrl: './paint-palette.component.scss'
})
export class PaintPaletteComponent {


  private _brush = 0.5657;
  private _color: Color = '#ff5252';
  private _shades: Color[] = Colors1.concat(Colors2, Colors3, Colors4);

  public expandPalette = false;
  public colors1: Color[] = Colors1;
  public colors2: Color[] = Colors2;
  public colors3: Color[] = Colors3;
  public colors4: Color[] = Colors4;
  public brushSizes = BrushSizes;

  @Input({ required: true })
  public set brushSize(size: number) {
    // make it generic by throwing error if value is not passed
    this._brush = size || 0.5657;
  }

  public get brushSize(): number {
    return this._brush;
  }
  @Output() brushSizeChange = new EventEmitter<number>();


  @Input({ required: true })
  public set shade(color: Color) {
    this._color = color || '#ff5252';
  }

  public get shade(): Color {
    return this._color;
  }
  @Output() shadeChange = new EventEmitter<Color>();
 

  //convert this mouseEvent to directive
  onToggleMoreColors(event: MouseEvent) {
    event.stopPropagation();
    this.expandPalette = !this.expandPalette;
  }

  //convert this mouseEvent to directive
  onSelectColor(shade: Color, event: MouseEvent) {
    event.stopPropagation();
    if (!this._shades.includes(shade)) return;
    this._color = shade;
    this.shadeChange.emit(this._color);
  }
  //convert this mouseEvent to directive
  onSelectSize(size: number, event: MouseEvent) {
    event.stopPropagation();
    if (!size) return;
    this._brush = size;
    this.brushSizeChange.emit(this._brush);
  }

}
