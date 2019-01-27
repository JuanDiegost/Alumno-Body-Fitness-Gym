import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogEditUserComponent} from "./../dialogs/edit-user/dialog-edit-user.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialogEditUser() {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      width: '35%',
      height: '90%',
    });
    this.showScreenDark(dialogRef);
  }
  
  private showScreenDark(dialogRef) {
    if (this.isScreenLow()) {
      dialogRef.updateSize('70%', '90%');
    }
    this.setEventOpacityScreen(dialogRef);
  }
  isScreenLow(): boolean {
    return window.screen.width < 900;
  }
  private setEventOpacityScreen(dialogRef) {
    const divMain = document.getElementById('div-main');
    // events for opacity screen
    this.setOpacityScreenLight(divMain);
    // events for leave the screen regular
    dialogRef.beforeClosed().subscribe(result => {
      this.setOpacityScreenRegular(divMain);
    });
  }

  private setOpacityScreenLight(divMain: HTMLElement) {
    // @ts-ignore
    divMain.style = 'filter: alpha(opacity=0.1); /* internet explorer */\n' +
      '  -khtml-opacity: 0.1;      /* khtml, old safari */\n' +
      '  -moz-opacity: 0.1;      /* mozilla, netscape */\n' +
      '  opacity: 0.1;      /* fx, safari, opera */';
  }

  private setOpacityScreenRegular(divMain: HTMLElement) {
    // @ts-ignore
    divMain.style = 'filter: alpha(opacity=1); /* internet explorer */\n' +
      '  -khtml-opacity: 1;      /* khtml, old safari */\n' +
      '  -moz-opacity: 1;      /* mozilla, netscape */\n' +
      '  opacity: 1;      /* fx, safari, opera */';
  }

}
