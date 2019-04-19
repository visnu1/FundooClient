import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, } from '@angular/core';
import { Router } from '@angular/router';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { OnDestroy, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { DataService } from 'src/app/services/data-service/data.service';
import { NoteService } from 'src/app/services/service/note.service';



@Component({
  selector: 'app-icons-toolbar',
  templateUrl: './icons-toolbar.component.html',
  styleUrls: ['./icons-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconsToolbarComponent implements OnInit {



  constructor(private service: NoteService, private router: Router, private data: DataService) {
  }

  // @ViewChild('element') element: ElementRef<HTMLElement>;


  // ngAfterViewInit() {
  //   this.focusMonitor.monitor(this.element)
  //     .subscribe(origin => this.ngZone.run(() => {
  //       this.more();
  //     }));
  // }

  // ngOnDestroy() {
  //   this.focusMonitor.stopMonitoring(this.element);
  // }

  ///////////////////////////////////

  pop: boolean = false;
  url: boolean = true;
  //to apply styles
  menuStyle: string = "menue";

  archiveB: string = "on";
  unArchiveB: string = "off"

  //To hide the icon
  @Input() undo: boolean;
  //To recieve the card details from the user notes on which the user poke
  @Input() card: any

  // @Input() upDateCard

  @Output() archiveCard = new EventEmitter();
  @Output() colorCard = new EventEmitter();
  //for archive old card and trash card
  @Output() action = new EventEmitter();
  //for delete forever and restore
  @Output() trashact = new EventEmitter();
  @Output() archiveAct = new EventEmitter();




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


  ngOnInit() {
    if (this.router.url == '/dashboard/trash') {
      this.url = false;
      this.menuStyle = "menui"
    }
    if (this.router.url == '/dashboard/archive') {
      this.archiveB = "off";
      this.unArchiveB = "on"
    }
    document.body.click()
  }

  closeMenu() {

  }

  more() {
    this.pop = !this.pop;
  }


  color(colorObj, card) {
    console.log(colorObj.color);
    console.log(card);
    // card.color=colorObj.color;
    if (card == undefined) {
      this.colorCard.emit(colorObj.color);
    } else {
      card.color = colorObj.color;
      this.updateColour(colorObj.color, card);
    }
  }

  updateColour(color, card) {
    let obj = {
      "cardId": card._id,
      "color": color
    }
    this.service.colorService(obj, this.data.token).subscribe(data => {
      console.log("card set for your choice");
    }, error => {
      console.error("unable to color your card:", error);
    })
  }

  archive(card) {
    if (card == undefined) {
      //take a note event emitter
      this.archiveCard.emit(true);
    } else {
      // card.archive = true;
      console.log(card);
      console.log(card._id);
      var obj = {
        "cardId": card._id,
        "archive": !card.archive,
      }
      this.service.archiveService(obj, this.data.token).subscribe(data => {
        this.action.emit();
        this.archiveAct.emit();
      }, error => {
        console.error("failed to initiate a user service:", error);
      })
    }
  }

  trash(card) {
    console.log(card);
    var obj = {
      "cardId": card._id,
      "trash": true,
    }
    this.service.trashService(obj, this.data.token).subscribe(data => {
      console.log(data);
      this.action.emit();
      this.archiveAct.emit();
    }, error => {
      console.error("failed to initiate a user service:", error);
    })
  }

  restore(card) {
    var obj = {
      "cardId": card._id,
      "trash": false
    }
    this.service.trashService(obj, this.data.token).subscribe(data => {
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
    this.service.deleteService(obj, this.data.token).subscribe(data => {
      console.log(data);
      this.trashact.emit(card);
    }, error => {
      console.error("unable to delete note:", error)
    })
  }



  // $(document.body).click( function() {
  //   closeMenu();
  // });

  // $(".dialog").click( function(e) {
  //   e.stopPropagation(); // this stops the event from bubbling up to the body
  // });
}
