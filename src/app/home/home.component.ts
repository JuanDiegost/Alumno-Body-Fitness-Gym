import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogContentServiceComponent} from '../dialogs/service/dialog-content-service.component';
import {DialogLoginComponent} from '../dialogs/login/dialog-login.component';
import {ServicePageHome} from '../services/page-home/service-page-home.service';

// Cover Flow
import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';

// Animations
import { trigger, state, style, animate, transition } from '@angular/animations';

import {PackageRouterService, ChipServices, UserType} from '../interfaces';
import {Router} from '@angular/router';
import {ServiceLogin} from '../services/login/service-login.service';
import {RoutersApp} from '../util/RoutersApp';
import {Messages} from '../util/Messages';


declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-200%)' }),
        animate('1.3s 300ms ease-in'),
      ])
    ])
  ]
})

// @ts-ignore
export class HomeComponent implements OnInit {
  configCarousel = {
    index: 0,
    speed: 4000,
    autoplay: true,
    direction: 'right',
    infinite: true,
  };
  // @ts-ignore
  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  example1SwipeOptions: any;

  title = 'Body-Fitness-Gym';
  // dataSourceTableRates = this.servicePageHome.getRates();
  dataSourceNews = []; // [
  //   {
  //     titular: 'aaa',
  //     contenido: 'aaaa      aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa bbbbbb bbbbbbbbbbbbbbb',
  //     urlImagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnkZF6g7h3k-eW0yfRLd966_uyDCjJzogdy_N167yvygu1-2yC'
  //   },
  //   {
  //     titular: 'bbb',
  //     contenido: 'bbbb',
  //     urlImagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhaxguQMSwerHsLxzWR7rOdiaazf4D69VDH7uB5rXwMLGnqD_8'
  //   }
  // ];
  // dataSourceNews = this.servicePageRoot.getNews();
  displayedColumns = ['name', 'value'];
  dataSourceTableRates = [
      {name: 'Mensualidad acondicionamiento físico', value: '$60.000'},
      {name: 'Mensualidad de spinning', value: '$80.000'},
      {name: 'Mensualidad con acceso total al gimnasio', value: '$100.000'},
      {name: 'Mensualidad para integrante de club deportivo', value: '$45.000'},
      {name: 'Mensualidad para grupos de 2 o más', value: '$55.000 c/u'},
      {name: 'Mensualidad estudiante', value: '$50.000'},
      {name: 'Quincenal', value: '$40.000'},
      {name: 'Mensualidad entrenamiento personal', value: '$450.000'},
      {name: '2 meses', value: '$110.000'},
      {name: '3 meses', value: '$150.000'},
      {name: '6 meses', value: '$270.000'},
      {name: '1 año', value: '$480.000'},
      {name: 'Sesión', value: '$6.000'},
      {name: 'Sesión para integrante de club deportivo', value: '$5.000'},
      {name: 'Sesión de Spinning', value: '$6.000'},
      {name: 'Tarjeta ejecutiva de 5 clases', value: '$26.000'},
      {name: 'Tarjeta ejecutiva de 10 clases', value: '$50.000'},
      {name: 'Tarjeta ejecutiva de 15 clases', value: '$70.000'},
      {name: 'Tarjeta ejecutiva de 20 clases', value: '$90.000'},
      {name: 'Tarjeta ejecutiva de 30 clases', value: '$120.000'},
    ];

  // @ts-ignore
  availablePrograms: any[];
  // appComponentTableServices = new AppComponentTableServices();

  constructor(public dialog: MatDialog, private servicePageHome: ServicePageHome, private serviceLogin: ServiceLogin,
              private router: Router) {
    this.example1SwipeOptions = {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 5
    };
    this.updateNews();
    this.updateService();
  }/*#58B957*/

  updateNews() {
    this.dataSourceNews = [];
    const s = this.servicePageHome.read(Messages.urlAllNews);
    s.subscribe(res => {
        // @ts-ignore
        this.dataSourceNews = res;
      },
      error => {
      });
  }

  updateService() {
    this.dataSourceNews = [];
    const s = this.servicePageHome.read(Messages.urlAllServices);
    s.subscribe(res => {
        // @ts-ignore
        this.availablePrograms = res;
      },
      error => {
      });
  }

  scrollToElement(elemId): void {
    const element = document.getElementById(elemId);
    if (navigator.userAgent.indexOf('Firefox') !== -1 ||
      (navigator.userAgent.indexOf('Chrome') !== -1 && !this.isScreenLow())) {
      element.scrollIntoView({behavior: 'smooth'});
    } else {
      const positionOfElement = this.getPositionOfElement(element);
      window.scroll(positionOfElement.posX, positionOfElement.posY);
    }
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEvent);

    const listImg = document.getElementsByTagName('img');
    for (let i = 0; i < listImg.length; i++) {
      listImg[i].style.height = screen.height + 'px';
    }

    // const divServices = document.getElementById('div-image-services');
    // divServices.style.height = screen.height + 'px';
  }

  scrollEvent(event) {
    const toolbar = document.getElementById('mat-toolbar-home');
    if (scrollY > 180) {
      toolbar.style.backgroundColor = '#2196f3';
    } else {
      toolbar.style.backgroundColor = 'transparent';
    }
    toolbar.style.color = 'white';
  }

  isScreenLow(): boolean {
    return window.screen.width < 900;
  }

  openDialogService(chipServices) {
    const dialogRef = this.dialog.open(DialogContentServiceComponent, {
      width: '80%',
      height: '80%',
      data: chipServices,
    });
    this.setEventOpacityScreen(dialogRef);
  }

  openDialogLogin() {
    if (this.serviceLogin.isUserLoggedIn()) {
      const user = this.serviceLogin.getTypeUser();
      console.log(user);
      if (user.type === UserType.STUDENT) {
        this.navigate(RoutersApp.student + '/' + RoutersApp.profile);
      } else if (user.type === UserType.TRAINER) {
        this.navigate(RoutersApp.trainer);
      }
      return;
    }
    const dataRouterService: PackageRouterService = {router: this.router, servicePageHome: this.servicePageHome,
      serviceLogin: this.serviceLogin};
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: 'max-content',
      height: 'max-content',
      data: dataRouterService,
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        window.removeEventListener('scroll', this.scrollEvent);
      }
    });
    this.setEventOpacityScreen(dialogRef);
  }

  private setEventOpacityScreen(dialogRef) {
    const divMain = document.getElementById('div-main');
    // events for opacity screen
    this.setOpacityScreenLight(divMain);
    // events for leave the screen regular
    dialogRef.beforeClose().subscribe(result => {
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

  private getPositionOfElement(element) {
    let x = 0;
    let y = 0;
    while ( element && !isNaN( element.offsetLeft ) && !isNaN( element.offsetTop ) ) {
      x += element.offsetLeft - element.scrollLeft;
      y += element.offsetTop - element.scrollTop;
      element = element.offsetParent;
    }
    return { posX: x, posY: y, };
  }

  private navigate(router: string) {
    this.router.navigateByUrl(router);
  }

  openNews(news) {
    console.log(news);
  }
}
