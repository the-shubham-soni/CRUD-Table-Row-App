import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-another-tab',
  templateUrl: './another-tab.component.html',
  styleUrls: ['./another-tab.component.css'],
})
export class AnotherTabComponent {
  constructor(public dataService: DataService) {}
}
