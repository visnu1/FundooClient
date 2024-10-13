import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ToolOptions } from '../../../core/Models/sketch';

// Define all possible tools
type Tool = 'pen' | 'marker' | 'highlighter' | 'eraser' | 'select';

@Component({
  selector: 'app-paint-toolbar',
  templateUrl: './paint-toolbar.component.html',
  styleUrls: ['./paint-toolbar.component.scss']
})
export class PaintToolbarComponent {

  // Default options
  pen: ToolOptions = { shade: '#ff5252', size: 6 };
  marker: ToolOptions = { shade: '#d500f9', size: 6 };
  highlighter: ToolOptions = { shade: 'black', size: 6 };
  eraser = { size: 0 };

  activeTool = signal<Tool>('pen');
  pageStyle = signal<string>('none');

  // Output to emit tool action changes
  @Output() toolAction = new EventEmitter<{ action: string, selectedTool: Tool, options: ToolOptions }>();
  @Output('pageStyle') updatePageStyle = new EventEmitter<string>();


  onUpdateTool(tool: Tool) {
    this.activeTool.set(tool);
    this.emitAction();
  }

  onOptsChange(tool: Tool, opts: ToolOptions) {
    this.activeTool.set(tool);
    // Dynamically update the tool's options using type safety
    (this[tool] as ToolOptions) = opts;
    this.emitAction();
  }

  // Emit an action to clear the canvas
  onClearCanvas() {
    this.emitAction('clearCanvas');
  }

  onPageStyle(type: 'square' | 'dots' | 'rules' | 'none') {
    this.pageStyle.set(type);
    this.updatePageStyle.emit(type);
  }

  // Emit the current action, selected tool, and options
  emitAction(action = 'toolchange') {
    const currentTool = this.activeTool();

    this.toolAction.emit({
      action,
      selectedTool: currentTool,
      options: this[currentTool]
    });
  }

  warningMsg() {
    alert('not yet implemented');
  }
}
