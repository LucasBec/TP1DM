import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonTitle,
  IonToolbar,
  MenuController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonBackButton,
    IonInputPasswordToggle,
    
  ],
})
export class LoginPage implements OnInit {
  
  user = {email: 'lucas@gmail.com', password: '12345', username: 'Lucas Beceiro'};
  

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email] ),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private menuController: MenuController, private router: Router) {}

  ngOnInit() {
    
  }
  
  ionViewWillEnter() {
  this.menuController.enable(false)
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  getUser() {
    return this.user
  }

  getUsername () {
    return this.user.username
  }

  onSubmit() {
    console.log('form values: ',this.loginForm.value);
    console.log('user: ',this.user);
    if (this.loginForm.value.email === this.user.email && this.loginForm.value.password === this.user.password) {
    console.log('usuario correcto');
    this.loginForm.reset();

    this.router.navigate(['/home', ])
    .then(nav => {
      console.log(nav);
    }, err => {
      console.log(err) 
    });
    }
    else {
      console.log('usuario incorrecto');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}
