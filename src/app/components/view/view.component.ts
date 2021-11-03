import { Component, OnInit } from '@angular/core';
import { PokeDataService } from 'src/app/services/poke-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  subscription: any;
  loading: any;
  poke: any;
  pokemon: any = null;


  constructor(private pokemonService: PokeDataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {

      if (this.pokemonService.pokemons.length) {
        this.pokemon = this.pokemonService.pokemons.find(i => i.name === params.name);
        if (this.pokemon) {
          this.getEvolution();
          return;
        }
      }

      this.subscription = this.pokemonService.get(params.name).subscribe(response => {
        this.pokemon = response;
        this.getEvolution();
      }, error => console.log('Error Occurred:', error));
    });
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
        this.pokemon.evolutions = [];
        this.subscription = this.pokemonService.getSpecies(this.pokemon.name)
            .subscribe(response => {
                const id = this.getId(response.evolution_chain.url);
                this.subscription = this.pokemonService.getEvolution(id)
                    .subscribe(response => this.getEvolves(response.chain));
            });
    }
}
getEvolves(chain: any) {
  this.pokemon.evolutions.push({
      id: this.getId(chain.species.url),
      name: chain.species.name
  });

  if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
  }
}
getType(pokemon: any): string {
  return this.pokemonService.getType(pokemon);
}

// e.g. url: https://pokeapi.co/api/v2/evolution-chain/1/
getId(url: string): number {
  const splitUrl = url.split('/')
  return +splitUrl[splitUrl.length - 2];
}

}
