import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton 
} from '@ionic/angular/standalone';
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

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.rooms = this.roomService.getAllRooms();
  }

  toggleRoom(room: Room) {
    this.roomService.updateRoom(room.id, !room.available);
    this.loadRooms(); 
  }
}