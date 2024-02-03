import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/models/publication';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  _publications: Array<Publication> = [];

  constructor() { }

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications():void {
    for(let i = 0; i < 5; i++){
      var publication = new Publication("Test publication " + (i + 1), "../../../assets/images/login-screen.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rhoncus mi a erat cursus malesuada. Nullam vel ligula nisi. Maecenas dictum aliquet dui nec lacinia. Aenean posuere elit tellus, nec aliquam urna porttitor sit amet. Fusce vitae dolor dictum, cursus eros vel, luctus nulla. Fusce suscipit justo vel sem fermentum convallis. In elementum nisi ac placerat ullamcorper. Nullam eget faucibus est. Morbi luctus lectus dolor, quis cursus tortor finibus sed. Phasellus aliquam dictum facilisis. Nulla facilisis enim sit amet ante dapibus, vel vestibulum sem venenatis. Nam commodo mauris nec laoreet feugiat.",
     "TestUser", new Date());
      this._publications.push(publication);
    }
  }

  formatDateAsString(date: Date): string {
    return this.formatDateNumber(date.getDate()) + "/" + this.formatDateNumber(date.getMonth() + 1) + "/" + this.formatDateNumber(date.getFullYear()) + " " + this.formatDateNumber(date.getHours()) + ":" + this.formatDateNumber(date.getMinutes());
  }

  formatDateNumber(dateNumber: number): string {
    return dateNumber < 10 ? "0" + dateNumber.toString() : dateNumber.toString();
  }

}
