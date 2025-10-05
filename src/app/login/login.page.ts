import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonInput, IonButton, IonIcon, IonNote, IonText } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'
import { shield, person, logIn, key, personCircle, shieldCheckmark, bed} from 'ionicons/icons'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonInput, IonButton, IonIcon, IonNote, IonText]
})
export class LoginPage implements OnInit {
  adminPassword: string = '';
  private readonly DEFAULT_ADMIN_PASSWORD = 'admin123';

  constructor(private router: Router,
    private alertController: AlertController
  ) { addIcons({shield, person, logIn, key, personCircle, shieldCheckmark, bed});
    this.initializeAdmin();
}

  initializeAdmin() {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      const defaultAdmin = {
        username: 'admin',
        password: this.DEFAULT_ADMIN_PASSWORD,
        hotelName: 'Pacific Reef'
      };
      localStorage.setItem('adminData', JSON.stringify(defaultAdmin));
    }
  }

  async adminLogin() {
    const storedAdmin = JSON.parse(localStorage.getItem('adminData') || '{}');

    if(this.adminPassword === storedAdmin.password) {
      localStorage.setItem('currentUser', JSON.stringify({
        role: 'admin',
        username: storedAdmin.username
      }));
      this.router.navigate(['/admin'])
    } else {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Invalid admin password',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  guestLogin() {
    localStorage.setItem('currentUser', JSON.stringify({
      role: 'guest',
      sessionId: 'guest_' + Date.now()
    }));
    this.router.navigate(['/guest']);
  }



  ngOnInit() {
  }

}
