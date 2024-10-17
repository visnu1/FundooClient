import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Fundoo-Client';
  showDisclaimer = signal(false);
  disclaimer = "This application is a personal project created solely for educational purposes and to demonstrate my skills. It is not intended for commercial use, and I do not claim any affiliation with or permissions from Google or any other entities. This project is a clone of Google Keep, and I do not intend to sell, monetize, or distribute it for any profit. All rights to the original Google Keep platform and its intellectual property belong to Google LLC."
  bannerMsg = "This application is a personal project developed for educational purposes. It replicates Google Keep, with no affiliation to or authorization from Google. Not intended for commercial use."

  ngOnInit(): void {
    const disclaimer = localStorage.getItem('disclaimer_seen');
    if (!disclaimer)
      this.showDisclaimer.set(true);
  }

  onUnderstood(): void {
    localStorage.setItem('disclaimer_seen', "done");
    this.showDisclaimer.set(false);
  }

}
