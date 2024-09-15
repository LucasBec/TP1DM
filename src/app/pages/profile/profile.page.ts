import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonBackButton, IonButton, ModalController } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { EditUserModal } from 'src/app/components/edit-user/edit-user.component';
import { EditPfpModalComponent } from 'src/app/components/edit-pfp-modal/edit-pfp-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonBackButton]
})
export class ProfilePage implements OnInit {

  user: { email: string; username: string; profilePicture?: string } | null = null;

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

  async openProfilePictureModal() {
    const modal = await this.modalCtrl.create({
      component: EditPfpModalComponent,
    });

    return await modal.present();
  }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditUserModal,
    });
    return await modal.present();
  }
  
}
