import { Injectable } from '@angular/core';

export interface Room {
  id: number;
  number: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly STORAGE_KEY = 'hotel_rooms';

  constructor() {
    this.initializeRooms();
  }

  private initializeRooms(): void {
    const existingRooms = localStorage.getItem(this.STORAGE_KEY);
    if (!existingRooms) {
      const rooms: Room[] = [];
      
      for (let i = 1; i <= 38; i++) {
        rooms.push({
          id: i,
          number: i.toString().padStart(2, '0'), // 01, 02, ... 38
          available: true
        });
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rooms));
    }
  }

  getAllRooms(): Room[] {
    const rooms = localStorage.getItem(this.STORAGE_KEY);
    return rooms ? JSON.parse(rooms) : [];
  }

  getAvailableRooms(): Room[] {
    return this.getAllRooms().filter(room => room.available);
  }

  updateRoom(roomId: number, available: boolean): void {
    const rooms = this.getAllRooms();
    const roomIndex = rooms.findIndex(room => room.id === roomId);
    
    if (roomIndex !== -1) {
      rooms[roomIndex].available = available;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rooms));
    }
  }
}