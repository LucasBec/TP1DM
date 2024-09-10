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
import { UserService } from 'src/app/services/user.service';

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

  newUser = {username: '', email: '', password: '', repassword: ''};

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email] ),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required]),
  });

  constructor(private menuController: MenuController, private router: Router, private userService: UserService) {}

  ngOnInit() { }

  //para que no funcione el sidemenu en el login
  ionViewWillEnter() {
    this.menuController.enable(false)
    }
  //para que funcione el sidemenu al salir del login
  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  onSubmit() {
    //alertar si las contraseñas no coinciden
    if (this.registerForm.value.password != this.registerForm.value.repassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    else if (this.registerForm.valid) {
      const newUser = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        username: this.registerForm.value.username
      };

      this.registerForm.reset();

      this.userService.setUser(newUser);

      this.router.navigate(['/home']);
    }

  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

