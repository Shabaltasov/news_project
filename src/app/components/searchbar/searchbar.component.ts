import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Output() searchInputEvent = new EventEmitter<string>();
  public inputValue: string = '';

  public onSearchInputChange() {
    this.searchInputEvent.emit(this.inputValue);
  }
}

