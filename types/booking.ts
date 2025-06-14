export interface Booking {
  booking: {
    _id: string
    bookingId: string
    noOfGuests: {
      adults: number
      children: number
    }
    checkInDate: string
    checkOutDate: string
    noOfRooms: number
    fullName: string
    email: string
    phone: string
    specialRequest?: string
    totalPrice: number
    paymentStatus: string
    createdAt: string
  }
  room: {
    _id: string
    roomImage: Array<{ url: string }>
    room_title: string
    desc: string
    pricePerNight: number
  }
  // user: {
  //   _id: string
  //   name: string
  //   email: string
  //   phone: string
  // }
}