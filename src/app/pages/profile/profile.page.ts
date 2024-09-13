import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonBackButton, IonButton, ModalController } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { EditUserModal } from 'src/app/components/edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonBackButton]
})
export class ProfilePage implements OnInit {

  user: { email: string; username: string; profilePicture?: string } | null = null;
  selectedFile: File | null = null; // Para almacenar la imagen seleccionada
  profileImageUrl: string | ArrayBuffer | null = ''; // URL de la imagen cargada

  constructor(private userService: UserService, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    // Suscribirse a los cambios del usuario logueado
    this.userService.loggedInUser$.subscribe(loggedInUser => {
      if (loggedInUser) {
        this.user = loggedInUser;
      }
    });
  }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditUserModal,
    });
    return await modal.present();
  }

    // Manejar la selección de la imagen
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result; // Convertir la imagen a base64 o URL
      };
  
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile); // Leer el archivo de imagen
      }
    }
  
    // Guardar la imagen seleccionada en el servicio
    saveProfilePicture() {
      if (this.profileImageUrl && this.user) {
        this.userService.updateUserProfilePicture(this.profileImageUrl.toString());
      }
    }
  
}
