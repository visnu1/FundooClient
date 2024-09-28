import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  allCards = {
    cards: [],
    gridCards1: [],
    gridCards2: [],
    gridCards3: [],
  }
  label: string;

  constructor(private service: NoteService, private data: DataService) { }


  ngOnInit() {
    this.data.currentLabel.subscribe(name => {
      this.label = name;
      this.getCards();
    })
  }

  getCards() {
    this.service.getNotes(this.data.token).subscribe(data => {
      this.segregate(data['result']);
    })
  }


  segregate(data) {
    let temp = [];
    let tempo = [];
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].trash == false && data[i].archive == false && data[i].labels.includes(this.label)) {
        data[i].labels = [this.label];
        temp.push(data[i]);
        tempo.push(data[i]);
      }
    }
    this.allCards.cards = temp.reverse();

    while (tempo.length > 0) {
      temp1.push(tempo.pop());
      if (tempo.length == 0) {
        break;
      } else {
        temp2.push(tempo.pop());
        if (tempo.length == 0) {
          break;
        } else {
          temp3.push(tempo.pop());
        }
      }
    }
    this.allCards.gridCards1 = temp1;
    this.allCards.gridCards2 = temp2;
    this.allCards.gridCards3 = temp3;
  }

  userinteract() {
    this.ngOnInit();
  }

}
