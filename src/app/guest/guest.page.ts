import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton 
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';
import { RoomService, Room } from '../services/room.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton
  ]
})
export class GuestPage implements OnInit {
  availableRooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadAvailableRooms();
  }

  loadAvailableRooms() {
    this.availableRooms = this.roomService.getAvailableRooms();
  }

  async bookRoom(room: Room) {
    const alert = await this.alertController.create({
      header: 'Confirmar reserva',
      message: `Reservar habitación ${room.number}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Reservar',
          handler: () => {
            this.confirmBooking(room);
          }
        }
      ]
    });

    await alert.present();
  }

  private async confirmBooking(room: Room) {
    this.roomService.updateRoom(room.id, false);
    
    const alert = await this.alertController.create({
      header: '¡Reserva exitosa!',
      message: `¡Habitación ${room.number} reservada!`,
      buttons: ['OK']
    });

    await alert.present();
    this.loadAvailableRooms(); 
  }
}