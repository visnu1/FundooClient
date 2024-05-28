import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../../dashboard.component';
import { FormControl } from '@angular/forms';
import { NoteService } from '../../../../services/service/note.service';
import { Observable, finalize, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.scss']
})
export class EditLabelsComponent implements OnInit {

  label = new FormControl("");
  exists = false;
  labelData: any[];

  newLabels = [];
  updatedLabels = [];
  deletedLabels = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<DashboardComponent>,
    private service: NoteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.labelData = data || [];
  }

  ngOnInit() {
    this.labelData.forEach(item => {
      item['dirty'] = false;
      item['newItem'] = false;
    });
  }


  addLabel(name: string) {
    const labelObj = {
      name, newItem: true, dirty: false
    };

    if (this.labelData.length === 0) {
      this.labelData.push(labelObj);
      return;
    }

    let start = 0;
    let mid = 0;
    let end = this.labelData.length - 1;

    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      const labelName = this.labelData[mid].name;
      const comparison = labelName.localeCompare(name);
      if (comparison < 0) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    this.labelData.splice(start, 0, labelObj);
  }

  onAddLabel() {
    this.exists = false;
    const labelVal = this.label.value;
    if (!labelVal) return;

    if (this.labelData.some(({ name }) => name.toLowerCase() === labelVal.toLowerCase())) {
      this.exists = true;
      return;
    }

    this.addLabel(labelVal);
    this.newLabels.push(labelVal);

    this.label.reset();
  }

  onRemoveLabel(index: number) {
    const deleteItem = this.labelData.splice(index, 1).pop();
    if (!deleteItem['newItem']) {
      this.deletedLabels.push(deleteItem);
    }
  }

  onRenameLabel(label: any, newName: string) {
    label['name'] = newName;
    label['dirty'] = true;
  }

  createLabels(labels: string[]): Observable<any> | null {
    if (!labels.length) return null;
    return this.service.addLabels({ labels });
  }

  renameLabels(labels: any[]): Observable<any> | null {
    if (!labels.length) return null;
    return this.service.renameLabels({ labels });
  }

  removeLabels(labels: any[]): Observable<any> | null {
    if (!labels.length) return null;
    return this.service.removeLabels({ labels }); //returns obervabale
  }

  async closeDialog() {
    const newLabels = [];
    const updatedLabels = [];
    this.labelData.forEach(item => {
      if (item.newItem) {
        newLabels.push(item.name);
        return;
      }
      if (item.dirty) {
        updatedLabels.push(item);
        return;
      }
    });
    const createObs = this.createLabels(newLabels);
    const renameObs = this.renameLabels(updatedLabels);
    const removeObs = this.removeLabels(this.deletedLabels);
    forkJoin([createObs, renameObs, removeObs].filter(obs => obs !== null))
      .pipe(
        finalize(() => this.dialogRef.close())
      )
      .subscribe({
        next: (response) => console.log(response),
        error: (err) => console.error(err),
        complete: () => console.log('Labels API complete')
      })
  }
}
