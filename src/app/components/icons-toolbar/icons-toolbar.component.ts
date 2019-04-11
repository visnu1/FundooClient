import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/service/user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-icons-toolbar',
  templateUrl: './icons-toolbar.component.html',
  styleUrls: ['./icons-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconsToolbarComponent implements OnInit {


  pop: boolean = false;
  url: boolean = true;
  //to apply styles
  menuStyle: string = "menue";


  //To hide the icon
  @Input() undo: boolean;
  //To recieve the card details from the user notes on which the user poke
  @Input() card

  @Output() archiveCard = new EventEmitter();
  @Output() colorCard = new EventEmitter();
  //for archive old card and trash card
  @Output() action = new EventEmitter();
  //for delete forever and restore
  @Output() trashact = new EventEmitter();


  colorbox = [
    { color: "#fff", title: "Default" },
    { color: "#f28b82", title: "Red" },
    { color: "#fbbc04", title: "Orange" },
    { color: "#fff475", title: "Yellow" },
    { color: "#ccff90", title: "Green" },
    { color: "#a7ffeb", title: "Teel" },
    { color: "#cbf0f8", title: "Blue" },
    { color: "#aecbfa", title: "Dark blue" },
    { color: "#d7aefb", title: "Purple" },
    { color: "#fdcfe8", title: "Pink" },
    { color: "#e6c9a8", title: "Brown" },
    { color: "#e0e0e0", title: "Gray" }
  ]

  constructor(private dashboard: DashboardComponent, private service: UserService, private router: Router) {
  }

  ngOnInit() {
    if (this.router.url == '/dashboard/trash') {
      this.url = false;
      this.menuStyle = "menui"
    }
  }

  more() {
    this.pop = true;
  }

  color(colorObj, card) {
    console.log(colorObj.color);
    console.log(card);
    if (card == undefined) {
      this.colorCard.emit(colorObj.color);
    } else {
      let obj = {
        "cardId": card._id,
        "color": colorObj.color
      }
      this.service.colorService(obj, this.dashboard.token).subscribe(data => {
        console.log("card set for your color");
        this.action.emit();
      }, error => {
        console.error("unable to color your card:", error);
      })
    }
  }

  archive(card) {
    if (card == undefined) {
      //take a note event emitter
      this.archiveCard.emit(true);
    } else {
      console.log(card);
      console.log(card._id);
      var obj = {
        "cardId": card._id,
        "archive": true,
      }
      this.service.archiveService(obj, this.dashboard.token).subscribe(data => {
        this.action.emit();
      }, error => {
        console.error("failed to initiate a user service:", error);
      })
    }
  }

  unarchive(card) {
    //should be implemented
  }

  trash(card) {
    console.log(card);
    var obj = {
      "cardId": card._id,
      "trash": true,
    }
    this.service.trashService(obj, this.dashboard.token).subscribe(data => {
      console.log(data);
      this.action.emit();
    }, error => {
      console.error("failed to initiate a user service:", error);
    })
  }

  restore(card) {
    var obj = {
      "cardId": card._id,
      "trash": false
    }
    this.service.trashService(obj, this.dashboard.token).subscribe(data => {
      this.trashact.emit(card);
    }, error => {
      console.error("unable to restore the card:", error)
    })
  }

  delete(card) {
    console.log(card);
    var obj = {
      "cardId": card._id
    }
    this.service.deleteService(obj, this.dashboard.token).subscribe(data => {
      console.log(data);
      this.trashact.emit(card);
    }, error => {
      console.error("unable to delete note:", error)
    })
  }
}
