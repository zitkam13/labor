import { Component } from '@angular/core';

@Component({ // für Informationen an die Klasse
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Labor G4';
  public time = '';
  public buttonText = 'STOP';
  private timeEnabled: boolean;

  constructor() {
    this.timeEnabled = true;
    setInterval( () => {
      if (this.timeEnabled) {
      this.time = new Date().toLocaleTimeString();
      }
    }, 100);
  }
  public onClick() {
    console.log('Button geklickt');
    this.timeEnabled = ! this.timeEnabled;
    if (this.timeEnabled) {
      this.buttonText = 'STOP';
    } else {
      this.buttonText = 'START';
    }
  }
}
