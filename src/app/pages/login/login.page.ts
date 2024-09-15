import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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
  ToastController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';



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

export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private menuController: MenuController,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastController: ToastController,
  ) 
    {
    this.loginForm = this.fb.group({
      email: ['lucas@gmail.com', [Validators.required, Validators.email]],
      password: ['12345', [Validators.required,]]
    });
  }

  ngOnInit() {}

  //para que no funcione el sidemenu en el login
  ionViewWillEnter() {
    this.menuController.enable(false)
    }
  //para que funcione el sidemenu al salir del login
  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const isAuthenticated = this.userService.login(email, password);// verifica si el usuario existe

      if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        await this.presentToast('Correo o contraseña inválidos');
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message, 
      duration: 2000, //milisegundos
      position: 'bottom', //(top, middle, bottom)
      color: 'danger', 
    });
    await toast.present();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  };
}



