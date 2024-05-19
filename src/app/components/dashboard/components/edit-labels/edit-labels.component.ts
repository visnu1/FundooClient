import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent, LabelData } from '../../dashboard.component';
import { FormControl, FormsModule } from '@angular/forms';
import { NoteService } from '../../../../services/service/note.service';


@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss']
})
export class EditLabelsComponent implements OnInit {

  label = new FormControl("")
  editedLabel = new FormControl('');
  exits: boolean = false;
  pen: string;
  done: string;
  show = true;

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    private service: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: LabelData
  ) { }

  ngOnInit() {
  }


  public get labels(): string[] {
    return this.data.labels.sort();
  }

  onAdd() {
    if (!this.label.value) return;
    if (this.data.labels.indexOf((this.label.value).toLowerCase()) != -1)
      this.exits = true;

    this.data.labels.push(this.label.value);
    this.data.addLabels.push(this.label.value);
    this.exits = false;
    this.label.reset();
  }

  onRemove(label: string) {
    var del = this.data.labels.splice(this.data.labels.indexOf(label), 1);
    this.data.deleteLabels.push(del.pop());
  }

  onRename(label: string, newLabel: string, index: number) {
    const ren = {
      old: label,
      new: newLabel
    }
    this.data.renameLabels.push(ren);
    this.data.labels[index] = newLabel;
  }

  close() {
    this.dialogRef.close()
  }

}
