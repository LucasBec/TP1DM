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
  ToastController,
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

export class RegisterPage {
  toastState = true;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.maxLength(30)] ),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    repassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(private menuController: MenuController,
    private router: Router,
    private userService: UserService,
    private toastController: ToastController,
  ) {
    
  }

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

  async onSubmit() {

    if (this.registerForm.value.password != this.registerForm.value.repassword) {
      this.toastState = false;
      {
      await this.presentToast('Las contraseñas no coinciden');
      return;
      };
    }
    else if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.repassword) {
      this.toastState = true;
      const newUser = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        username: this.registerForm.value.username
      };

      // Agregar el nuevo usuario a la lista de usuarios
      this.userService.addUser(newUser);

      this.registerForm.reset();

      console.log(this.userService.getUsers());
      await this.presentToast('Usuario registrado con éxito!');
      this.navigateToLogin();
    }
  }

  async presentToast(message: string) {
    if (this.toastState == false) {
      const toast = await this.toastController.create({
        message, 
        duration: 2000, //milisegundos
        position: 'middle', //(top, middle, bottom)
        color: 'danger', 
      });
      await toast.present();
    }

    else {
    const toast = await this.toastController.create({
      message, 
      duration: 2000, //milisegundos
      position: 'middle', //(top, middle, bottom)
      color: 'success', 
    });
    await toast.present();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
