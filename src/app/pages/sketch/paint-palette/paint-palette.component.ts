import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Color, ToolOptions } from '../../../core/Models/sketch';
import { Colors1, Colors2, Colors3, Colors4 } from '../../../core/constants/color.constants';


const BrushSizes = [
  { value: 4, label: 'Size 1', dimension: '2px' },
  { value: 6, label: 'Size 2', dimension: '4px' },
  { value: 8, label: 'Size 3', dimension: '8px' },
  { value: 12, label: 'Size 4', dimension: '12px' },
  { value: 18, label: 'Size 5', dimension: '16px' },
  { value: 28, label: 'Size 6', dimension: '20px' },
  { value: 40, label: 'Size 7', dimension: '24px' },
  { value: 52, label: 'Size 8', dimension: '28px' }
];

@Component({
  selector: 'app-paint-palette',
  templateUrl: './paint-palette.component.html',
  styleUrls: ['./paint-palette.component.scss']
})
export class PaintPaletteComponent {

  private _brush = 4;  // Default brush size
  private _color: Color = '#ff5252';  // Default color based on the Color type
  private readonly _shades = [...Colors1, ...Colors2, ...Colors3, ...Colors4];

  public readonly colors1 = Colors1;
  public readonly colors2 = Colors2;
  public readonly colors3 = Colors3;
  public readonly colors4 = Colors4;
  public readonly brushSizes = BrushSizes;

  public expandPalette = false;

  @Input({ required: true })
  public set toolOptions(opts: ToolOptions) {
    this._brush = opts?.size ?? 4;  // Default brush size if not provided
    this._color = this._validateShade(opts?.shade) ? opts.shade : '#ff5252';  // Validate shade against Color type
  }

  public get brushSize(): number {
    return this._brush;
  }

  public get shade(): Color {
    return this._color;
  }

  @Output() optionsChange = new EventEmitter<ToolOptions>();

  // Utility method to validate the color shade
  private _validateShade(color: string): color is Color {
    return this._shades.includes(color as Color);
  }

  onToggleMoreColors(event: MouseEvent) {
    event.stopPropagation();
    this.expandPalette = !this.expandPalette;
  }

  onSelectColor(shade: Color, event: MouseEvent) {
    event.stopPropagation();
    if (!this._validateShade(shade)) return;
    this._color = shade;
    this.emitChanges();
  }

  onSelectSize(size: number, event: MouseEvent) {
    event.stopPropagation();
    if (!size) return;
    this._brush = size;
    this.emitChanges();
  }

  private emitChanges() {
    this.optionsChange.emit({ size: this._brush, shade: this._color });
  }
}
