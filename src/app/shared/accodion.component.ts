import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accodion',
  templateUrl: './accodion.component.html',
  styleUrls: ['./accodion.component.css']
})
export class AccodionComponent implements OnInit {
  @Input() hasJustViewed: boolean;
  @Input() title: string;
  @Input() isHidden: false;

  constructor() { }

  ngOnInit() {
  }

}
