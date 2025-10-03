import { Component, OnInit } from '@angular/core';
import { TealbaseService } from './tealbase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-user-management';

  session = this.tealbase.session;

  constructor(private readonly tealbase: TealbaseService) {}

  ngOnInit() {
    this.tealbase.authChanges((_, session) => (this.session = session));
  }
}
