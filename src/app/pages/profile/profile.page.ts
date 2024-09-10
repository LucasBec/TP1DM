import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  providers: [LoginPage],
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonBackButton]
})
export class ProfilePage implements OnInit {

  constructor(private loginPage: LoginPage) { }

  ngOnInit() {
  }
  user = this.loginPage.getUser()

  username = this.user.username
  email = this.user.email
}
