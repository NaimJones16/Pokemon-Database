import { PokeDataService } from './services/poke-data.service'
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PokeDataService]
})
export class AppComponent {
  constructor(private pokeService: PokeDataService) {

  }

}
