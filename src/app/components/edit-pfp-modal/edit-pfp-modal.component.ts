import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { ModalController, IonButton, IonInput, IonContent, IonHeader, IonItem, IonModal, IonLabel, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-pfp-modal',
  templateUrl: './edit-pfp-modal.component.html',
  styleUrls: ['./edit-pfp-modal.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent, IonItem, IonLabel, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, CommonModule],
})
export class EditPfpModalComponent  {

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;  // Variable para almacenar la vista previa de la imagen
  profileImageUrl: string | ArrayBuffer | null = ''; // URL de la imagen cargada

  constructor(private modalCtrl: ModalController, private userService: UserService) {
    const user = this.userService.getLoggedInUser();
  }

  dismiss() {
    this.modalCtrl.dismiss();
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      //convertir la imagen a base64
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);  // Leer el archivo seleccionado
    }
  }

  savePfp() {
    if (this.selectedFile) {
      this.saveProfilePicture(this.selectedFile)
      this.modalCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss();
    }
  }

  // Guardar la imagen seleccionada
  saveProfilePicture(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.userService.updateUserProfilePicture(base64String);
    };
    reader.readAsDataURL(file);
  }
}
