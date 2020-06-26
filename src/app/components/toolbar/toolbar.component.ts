import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { ToolbarService } from '../../services/toolbar.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private sidenavService: SidenavService, private toolbarService: ToolbarService) { }

  isOpen = false;

  ngOnInit() {
    this.toolbarService.tg.subscribe( isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggleSidenav() {
    this.sidenavService.toggle();
// console.log("toggle toolbar");
  }



}
