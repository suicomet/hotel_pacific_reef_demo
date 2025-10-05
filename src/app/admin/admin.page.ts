import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton 
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';
import { RoomService, Room } from '../services/room.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton
  ]
})
export class AdminPage implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService,
    private alertController: AlertController) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.rooms = this.roomService.getAllRooms();
  }

  async toggleRoom(room: Room) {
    const isAvailable = room.available;
    const nextAvailable = !isAvailable;

    const header = isAvailable ? 'Confirmar reserva' : 'Confirmar cancelación';
    const message = isAvailable 
      ? `¿Reservar la habitación ${room.number}?`
      : `¿Cancelar la reserva de la habitación ${room.number}?`;

    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        { text: 'No', role: 'cancel' },
        { 
          text: 'Sí', 
          handler: async () => {
            this.roomService.updateRoom(room.id, nextAvailable);

            const success = await this.alertController.create({
              header: 'Listo',
              message: nextAvailable 
                ? `Reserva cancelada para la habitación ${room.number}.`
                : `¡Habitación ${room.number} reservada!`,
              buttons: ['OK']
            });
            await success.present();
            this.loadRooms();
          }
        }
      ]
    });

    await alert.present();
  }
}