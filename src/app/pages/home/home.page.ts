import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonMenuButton, Platform, IonChip, IonAvatar, IonLabel, } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton, IonIcon, IonButtons, IonMenuButton, IonChip, IonAvatar, IonLabel],
})

export class HomePage implements OnInit {

  user = this.userService.getLoggedInUser();

  constructor(private platform: Platform, private userService: UserService, private router: Router) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this.router.url === '/home') {
        // Si el usuario está en la página de inicio, no permitir retroceso
        console.log('Retroceso bloqueado en Home');
      };
    }
  );
  }

  ngOnInit(): void {
    this.userService.loggedInUser$.subscribe(user => {
      this.user = user;
      console.log('Usuario logueado: ', this.user);
    });
  }

}

