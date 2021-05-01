import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GiphyResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey: string = 'xKFGyG3jUVKXZ0AMbVlsdy8XjCk7fgmk';
  private _history: string[] = [];
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || []
    this.results = JSON.parse(localStorage.getItem('lastResults')!) || []
  }

  public get history() : string[] {
    return [...this._history];
  }

  public searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if(query.length === 0) return;
    if(!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    this.http.get<GiphyResponse>('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: this._apiKey,
        q: query,
        limit: '12'
      }
    }).subscribe((resp) => {
      this.results = resp.data;

      localStorage.setItem('lastResults', JSON.stringify(this.results));
    })
  }
}
