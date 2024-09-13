import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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
  loginError: string | null = null;

  constructor(private menuController: MenuController, private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['lucas@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]]
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

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const isAuthenticated = this.userService.login(email, password);// verifica si el usuario existe

      if (isAuthenticated) {
        // Redirigir al home si el login es exitoso
        this.router.navigate(['/home']);
        console.log('despues',this.userService.getLoggedInUser());
      } else {
        this.loginError = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  };
}
/* export class LoginPage implements OnInit {
  
  user = this.userService.getUser();
  
  

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('lucas@gmail.com', [Validators.required, Validators.email] ),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private menuController: MenuController, private router: Router, private userService: UserService) {}

  ngOnInit() {
    
  }
  
  ionViewWillEnter() {
  this.menuController.enable(false)
  };

  ionViewWillLeave() {
    this.menuController.enable(true);
  };

  getUser() {
    return this.user
  };

  getUsername () {
    return this.user.username
  };

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
    };
  }; */

  


