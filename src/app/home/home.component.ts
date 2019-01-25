import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogContentServiceComponent} from '../dialogs/service/dialog-content-service.component';
import {DialogLoginComponent} from '../dialogs/login/dialog-login.component';
import {ServicePageHome} from '../services/page-home/service-page-home.service';

// Cover Flow
import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';

// Animations
import { trigger, state, style, animate, transition } from '@angular/animations';

import {PackageRouterService, ChipServices} from '../interfaces';
import {Router} from '@angular/router';
import {ServiceLogin} from '../services/login/service-login.service';
import {RoutersApp} from '../util/RoutersApp';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  // @ts-ignore
  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  example1SwipeOptions: any;

  title = 'Body-Fitness-Gym';
  displayedColumns = ['name', 'id'];
  dataSourceTableRates = this.servicePageHome.getRates();
  // dataSourceNews = this.servicePageRoot.getNews();
  dataSourceNews = [
    {title: 'Reunion', subTitle: 'Reunion 1', pathImage: 'http://joemiller.us/wp-content/uploads/news-636978_960_720-1.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam deserunt dolorum earum eligendi enim in ipsam, odit perferendis, quos ratione recusandae saepe tempore temporibus vel? Architecto harum ipsum unde.              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam deserunt dolorum earum eligendi enim in ipsam, odit perferendis, quos ratione recusandae saepe tempore temporibus vel? Architecto harum ipsum unde.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam deserunt dolorum earum eligendi enim in ipsam, odit perferendis, quos ratione recusandae saepe tempore temporibus vel? Architecto harum ipsum unde.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam deserunt dolorum earum eligendi enim in ipsam, odit perferendis, quos ratione recusandae saepe tempore temporibus vel? Architecto harum ipsum unde.'},
    {title: 'Reunion', subTitle: 'Reunion 1', pathImage: 'http://joemiller.us/wp-content/uploads/news-636978_960_720-1.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam deserunt dolorum earum eligendi enim in ipsam, odit perferendis, quos ratione recusandae saepe tempore temporibus vel? Architecto harum ipsum unde.'},
  ];
  // dataSourceTableRates = [
  //     {name: 'Mensualidad acondicionamiento físico', value: '$60.000'},
  //     {name: 'Mensualidad de spinning', value: '$80.000'},
  //     {name: 'Mensualidad con acceso total al gimnasio', value: '$100.000'},
  //     {name: 'Mensualidad para integrante de club deportivo', value: '$45.000'},
  //     {name: 'Mensualidad para grupos de 2 o más', value: '$55.000 c/u'},
  //     {name: 'Mensualidad estudiante', value: '$50.000'},
  //     {name: 'Quincenal', value: '$40.000'},
  //     {name: 'Mensualidad entrenamiento personal', value: '$450.000'},
  //     {name: '2 meses', value: '$110.000'},
  //     {name: '3 meses', value: '$150.000'},
  //     {name: '6 meses', value: '$270.000'},
  //     {name: '1 año', value: '$480.000'},
  //     {name: 'Sesión', value: '$6.000'},
  //     {name: 'Sesión para integrante de club deportivo', value: '$5.000'},
  //     {name: 'Sesión de Spinning', value: '$6.000'},
  //     {name: 'Tarjeta ejecutiva de 5 clases', value: '$26.000'},
  //     {name: 'Tarjeta ejecutiva de 10 clases', value: '$50.000'},
  //     {name: 'Tarjeta ejecutiva de 15 clases', value: '$70.000'},
  //     {name: 'Tarjeta ejecutiva de 20 clases', value: '$90.000'},
  //     {name: 'Tarjeta ejecutiva de 30 clases', value: '$120.000'},
  //   ];

  // @ts-ignore
  availableColors: ChipServices[] = [
    {name: 'Spinning Jonny G', color: 'primary', description: 'Spinnign-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- asdasdnkajsxa', image: 'data:image/jpeg;base64,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'},
    {name: 'Acondicionamieto Fisico General', color: 'indigo', description: '', image: ''},
    {name: 'Aerobicos', color: 'primary', description: '', image: ''},
    {name: 'Entrenamiento personalizado', color: 'indigo', description: '', image: ''},
    {name: 'Actividad fisica terapeutica', color: 'primary', description: '', image: ''},
    {name: 'Guepardex MTB', color: 'indigo', description: '', image: ''},
  ];
  // appComponentTableServices = new AppComponentTableServices();

  constructor(public dialog: MatDialog, private servicePageHome: ServicePageHome, private serviceLogin: ServiceLogin,
              private router: Router) {
    this.example1SwipeOptions = {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 5
    };
  }/*#58B957*/

  moveNext() {
    this.swiperContainer.swiper.slideNext();
  }

  movePrev() {
    this.swiperContainer.swiper.slidePrev();
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

    const divServices = document.getElementById('div-image-services');
    divServices.style.height = screen.height + 'px';
  }

  scrollEvent(event) {
    const toolbar = document.getElementById('mat-toolbar-home');
    if (scrollY > 180) {
      toolbar.style.backgroundColor = 'black';
    } else {
      toolbar.style.backgroundColor = 'transparent';
    }
    toolbar.style.color = 'white';
  }

  isScreenLow(): boolean {
    return window.screen.width < 900;
  }

  openDialogService(chipServices: ChipServices) {
    const dialogRef = this.dialog.open(DialogContentServiceComponent, {
      width: '80%',
      height: '80%',
      data: chipServices,
    });
    this.setEventOpacityScreen(dialogRef);
  }

  openDialogLogin() {
    if (this.serviceLogin.isUserLoggedIn()) {
      this.navigate(RoutersApp.student);
      return;
    }
    const dataRouterService: PackageRouterService = {router: this.router, servicePageHome: this.servicePageHome,
      serviceLogin: this.serviceLogin};
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: 'max-content',
      height: 'max-content',
      data: dataRouterService,
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
}
