import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { email: 'lucas@gmail.com', password: '12345', username: 'Lucas Beceiro', profilePicture: '' }
  ];

  private loggedInUserSubject = new BehaviorSubject<{ email: string; password: string; username: string; profilePicture?: string } | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() { }

  // Añadir un nuevo usuario
  addUser(newUser: { email: string; password: string; username: string }) {
    const userWithProfilePicture = { ...newUser, profilePicture: '' }; // Agregamos un valor por defecto
    this.users.push(userWithProfilePicture);
  }

  // Obtener la lista de usuarios
  getUsers() {
    return this.users;
  }

  // Iniciar sesión y actualizar el BehaviorSubject
  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.loggedInUserSubject.next(user);  // Actualizamos el BehaviorSubject con el usuario logueado
      return true;
    }
    return false;
  }

  // Obtener el usuario logueado
  getLoggedInUser() {
    return this.loggedInUserSubject.value;
  }

  // Actualizar los datos del usuario logueado
  updateUser(updatedUser: { email: string; username: string }) {
    const currentUser = this.loggedInUserSubject.value;
    if (currentUser) {
      const userIndex = this.users.findIndex(u => u.email === currentUser.email);
      if (userIndex !== -1) {
        // Actualizamos los datos en la lista de usuarios
        this.users[userIndex].email = updatedUser.email;
        this.users[userIndex].username = updatedUser.username;

        // Actualizamos el BehaviorSubject con los nuevos datos
        this.loggedInUserSubject.next(this.users[userIndex]);
      }
    }
  }

  // Método para actualizar la foto de perfil
  updateUserProfilePicture(profilePicture: string) {
    const currentUser = this.loggedInUserSubject.value;
    if (currentUser) {
      const userIndex = this.users.findIndex(u => u.email === currentUser.email);
      if (userIndex !== -1) {
        this.users[userIndex].profilePicture = profilePicture;

        // Actualiza el BehaviorSubject con la nueva imagen de perfil
        this.loggedInUserSubject.next(this.users[userIndex]);
      }
    }
  }

  logout() {
    this.loggedInUserSubject.next(null);
  }
}
