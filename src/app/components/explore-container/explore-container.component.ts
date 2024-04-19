import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
})
export class ExploreContainerComponent  implements OnInit {
  @Input() name?: string;
  constructor() { }

  ngOnInit() {}

}
