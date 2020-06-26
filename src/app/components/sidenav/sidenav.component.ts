import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import { SidenavService } from "../../services/sidenav.service";
import { ConnectionService } from "ng-connection-service";
import { PingServerService } from "src/app/services/ping-server.service";
import { DialogLogoutComponent } from "../dialogs/dialog-logout/dialog-logout.component";
import { AuthService } from "src/app/services/auth.service";
import { AppUserAuth } from "src/app/security/app-user-auth";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  isSidenaveText: boolean;
  ngStyle: string;
  isOpen = true;
  isConnected = true;
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  showSubSubMenu = false;
  securityObject: AppUserAuth = null;

  events: string[] = [];
  opened = true;
  over = "side";
  expandHeight = "42px";
  collapseHeight = "42px";
  displayMode = "flat";



  constructor(
    private sidenavService: SidenavService,
    private connectionService: ConnectionService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.securityObject = this.authService.securityObject;
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
    });
  }

  ngOnInit() {
    this.sidenavService.tg.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      width: "450px",
    });

    dialogRef.afterClosed().subscribe((isLogout: boolean) => {
      console.log("The dialog was closed");
      if (isLogout) {
        this.authService.logout();
        console.log("Logout...");
      }
    });
  }
}
