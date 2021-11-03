import { Component, OnInit } from '@angular/core';
import { PokeDataService } from 'src/app/services/poke-data.service';
import { concat, Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  static _pageSize = 15;
  loading: boolean = false;
  subscriptions: Subscription[] = [];
  poke: any;

  constructor(private pokemonService: PokeDataService) { }

  ngOnInit(): void {
    if (!this.pokemons.length) {
      this.loadMore();
      //0, ListComponent._pageSize
    }
  }

  get pokemons(): any[] {
    return this.pokemonService.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  loadMore(): void {
    //page: number, limit: number
    this.loading = true;
    this.subscription = this.pokemonService.getNext().subscribe(response => {
      this.pokemonService.next = response.next;
      const details = response.results.map((i: any) => this.pokemonService.get(i.name));
      this.subscription = concat(...details).subscribe((response: any) => {
        this.pokemonService.pokemons.push(response);
      });
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  
 
}
