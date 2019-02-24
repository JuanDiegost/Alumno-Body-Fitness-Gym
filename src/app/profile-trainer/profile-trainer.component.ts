import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ServiceUserService} from '../services/services-user/service-user.service';
import {RoutersApp} from '../util/RoutersApp';
import {DialogEditUserComponent} from '../dialogs/edit-user/dialog-edit-user.component';
import {DialogEditPassComponent} from '../dialogs/dialog-edit-pass/dialog-edit-pass/dialog-edit-pass.component';
import {DialogEditTrainerComponent} from '../dialogs/edit-trainer/dialog-edit-trainer.component';

@Component({
  selector: 'app-profile-trainer',
  templateUrl: './profile-trainer.component.html',
  styleUrls: ['./profile-trainer.component.css']
})
export class ProfileTrainerComponent implements OnInit {
  trainer = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public userService: ServiceUserService
  ) {}

  public loading = true;

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser() {
    this.loading = true;
    this.userService.getUserDataTrainer().subscribe(
      res => {
        this.loading = false;
        res = res['value'];
        if (res) {
          this.trainer = res;
        }
      },
      err => {
        console.log(err);
        // localStorage.removeItem("idAlumno");
        localStorage.clear();
        this.router.navigateByUrl(RoutersApp.home);
      }
    );
  }

  openDialogEditUser() {
    const dialogRef = this.dialog.open(DialogEditTrainerComponent, {
      width: '35%',
      height: '90%',
      data: this.trainer
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getDataUser();
      }
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
    divMain.style =
      'filter: alpha(opacity=0.1); /* internet explorer */\n' +
      '  -khtml-opacity: 0.1;      /* khtml, old safari */\n' +
      '  -moz-opacity: 0.1;      /* mozilla, netscape */\n' +
      '  opacity: 0.1;      /* fx, safari, opera */';
  }

  private setOpacityScreenRegular(divMain: HTMLElement) {
    // @ts-ignore
    divMain.style =
      'filter: alpha(opacity=1); /* internet explorer */\n' +
      '  -khtml-opacity: 1;      /* khtml, old safari */\n' +
      '  -moz-opacity: 1;      /* mozilla, netscape */\n' +
      '  opacity: 1;      /* fx, safari, opera */';
  }
}
