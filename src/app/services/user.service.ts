import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = {email: 'lucas@gmail.com', password: '12345', username: 'Lucas Beceiro'};

  constructor() { }

  //guardar nuevo usuario
  setUser(newUser: { email: string; password: string; username: string }) {
    this.user = newUser;
  }

  getUser() {
    return this.user;
  }

  // Método para limpiar los datos del usuario
  clearUser() {
    this.user = { email: '', password: '', username: '' };
  }
}
