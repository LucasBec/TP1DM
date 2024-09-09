import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonMenuButton, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [LoginPage],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton, IonIcon, IonButtons, IonMenuButton],
})
export class HomePage implements OnInit {
  constructor(private loginPage: LoginPage) {
    addIcons({ personCircleOutline });
  }

  ngOnInit(): void {
      
  }
  user = this.loginPage.getUsername()
}

