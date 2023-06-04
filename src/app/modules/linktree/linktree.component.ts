import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-linktree',
  templateUrl: './linktree.component.html',
  styleUrls: ['./linktree.component.scss']
})
export class LinktreeComponent implements OnInit {

  constructor(    private titleService:Title) { }

  ngOnInit(): void {
        this.titleService.setTitle('Dr.Gamal El-Kenany');

  }

}
