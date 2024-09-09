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
  MenuController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage implements OnInit {

  newUser = {email: 'user@gmail.com', password: '12345', repassword: '{password}'};

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email] ),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required]),
  });

  constructor(private menuController: MenuController, private router: Router) {}

  ngOnInit() {
    
  }

  //para que no funcione el sidemenu en el login
  ionViewWillEnter() {
    this.menuController.enable(false)
    }
  //para que funcione el sidemenu al salir del login
  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  onSubmit() {
    console.log('form values: ',this.registerForm.value);
    console.log('user: ',this.newUser);
    if (this.registerForm.value.email === this.newUser.email && this.registerForm.value.password === this.newUser.password) {
    console.log('usuario correcto');
    this.registerForm.reset();

    this.router.navigate(['/', 'home'])
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }



}

