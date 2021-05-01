import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  public get history() : string[] {
    return this.gifsService.history;
  }

  execQuery(q: string) {
    this.gifsService.searchGifs(q)
  }

}
