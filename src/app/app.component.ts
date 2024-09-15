import { Component } from '@angular/core';
import { RouterLink, NavigationEnd, Router} from '@angular/router';
import { IonApp, IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar, MenuController, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonLabel, 
    IonApp, 
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    RouterLink,

  ],
})
export class AppComponent {

  constructor(private menuController: MenuController, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/register') {
          this.menuController.enable(false);
        } else {
          this.menuController.enable(true);
        }
      }
    });
  }

  closeMenu() {
    this.menuController.close();
  }
}
