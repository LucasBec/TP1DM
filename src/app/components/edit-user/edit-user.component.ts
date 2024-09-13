import { Component } from '@angular/core';
import { ModalController, IonButton, IonInput, IonContent, IonHeader, IonItem, IonModal, IonLabel, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent, ReactiveFormsModule, IonItem, IonLabel, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons],
})
export class EditUserModal {

  editProfileForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private userService: UserService) {
    const user = this.userService.getLoggedInUser();
    
    this.editProfileForm = this.fb.group({
      username: [user?.username || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
    });
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }


  saveChanges() {
    if (this.editProfileForm.valid) {
      this.userService.updateUser(this.editProfileForm.value);
      this.dismiss();
    }
  }
}
