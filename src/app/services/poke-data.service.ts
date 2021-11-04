import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokeAPI } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  constructor(private http: HttpClient) { }

  private url: string = environment.apiUrl + 'pokemon/';
  private _pokemons: any[] = [];
  private _next: string = '';

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  get(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get(url);
  }

  getNext(): Observable<any> {
    //page: number, limit: number
    const url = this.next === '' ? `${this.url}?limit=25` : this.next;
    // const url = this.http.get<any>(`${this.url}/pokemon?page=${page}&limit=${limit}`, {observe: 'response'});
    return this.http.get(url);
    // return url;
  }

  getNextSet(): Observable<any> {
    //page: number, limit: number
    const url = this.next === '' ? `${this.url}?limit=25&offset=25` : this.next;
    // ?limit=25&offset=25
    // const url = this.http.get<any>(`${this.url}/pokemon?page=${page}&limit=${limit}`, {observe: 'response'});
    return this.http.get(url);
    // return url;
  }

  getEvolution(id: number): Observable<any> {
    const url = `${environment.apiUrl}evolution-chain/${id}`;
    return this.http.get(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${environment.apiUrl}pokemon-species/${name}`;
    return this.http.get(url);
  }

  getData(url: string) {
    return this.http.get(url)
  }

  getPokemon(limit: number = 25, offset: number = 0){
    const params = {
      limit: limit.toString(),
      offset: offset.toString(),
    };

    const res = this.http.get('https://pokeapi.co/api/v2/pokemon', { params,  observe: 'response'});

    return res;
  }


}
