import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/service/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  allCards = {
    cards: [],
    gridCards1: [],
    gridCards2: [],
    gridCards3: [],
  }

  constructor(private service: NoteService, private data: DataService) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    //console.log(this.data.token);
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
      if (data[i].trash == false && data[i].archive == false) {
        temp.push(data[i]);
        tempo.push(data[i]);
      }
    }
    this.allCards.cards = temp
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
