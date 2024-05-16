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

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, private service: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: LabelData) { }

  ngOnInit() {
  }

  onAdd() {
    if (this.data.labels.indexOf((this.label.value).toLowerCase()) === -1) {
      this.data.labels.push(this.label.value);
      this.data.addLabels.push(this.label.value);
      this.exits = false
    } else {
      this.exits = true;
    }
    this.label.reset();
  }

  onRemove(label) {
    var del = this.data.labels.splice(this.data.labels.indexOf(label), 1);
    this.data.deleteLabels.push(del.pop());
  }

  onRename(label, index) {
    var ren = {
      old: label,
      new: this.editedLabel.value
    }
    this.data.renameLabels.push(ren);
    this.data.labels[index] = this.editedLabel.value;
  }

  close() {
    console.log(this.data.labels);
    console.log(this.editedLabel.value);

    this.dialogRef.close()
  }

}
