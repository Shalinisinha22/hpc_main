export interface RoomImage {
  url: string;
  name: string;
  ext: string;
  _id: string;
}

export interface Room {
  _id: string;
  roomImage: RoomImage[];
  room_title: string;
  desc: string;
  pricePerNight: number;
  max_person: number;
  max_children: number;
  totalRooms: number;
  roomSize: number;
  bedType: string;
  amenities: string[];
  additionalDetails: string[];
  status: string;
  cdate: string;
}