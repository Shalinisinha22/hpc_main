"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f2]">
      <Header />
      <main className="flex-1">
        <div className="relative h-[32vh] md:h-[40vh] overflow-hidden flex items-center justify-center mb-8">
          <Image
            src="/banner.jpg"
            alt="Refund Policy Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/10" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">Refund & Cancellation Policy</h1>
            <p className="text-base md:text-xl drop-shadow">Please read our refund and cancellation policy carefully.</p>
          </div>
        </div>
        <div className="container mx-auto px-2 md:px-4 py-8">
          <div className="bg-white/95 border border-amber-200 rounded-2xl shadow-2xl p-4 md:p-10 max-w-4xl mx-auto relative">
            <div className="prose max-w-none prose-amber text-gray-800 prose-h1:text-[#bf840d] prose-h2:text-[#bf840d] prose-h3:text-[#bf840d] prose-h2:mb-4 prose-h3:mb-2 prose-li:mb-4 prose-p:mb-5 prose-ol:pl-6 prose-ol:mt-2 prose-ol:mb-6 prose-strong:text-[#bf840d] prose-strong:font-semibold">
              <h2>Reservation:</h2>
              <ul>
                <li>Please make an advance reservation via telephone or book online to assure room availability status.</li>
                <li>A deposit is required to obtain a guaranteed reservation. Please review the cancellation policy before proceeding for a reservation.</li>
                <li>Rates may change without notice and vary for special events except for confirmed reservation (if a deposit is taken).</li>
                <li>All rates are subject to any applicable GST as per room tariff.</li>
              </ul>
              <h2>Occupancy:</h2>
              <ul>
                <li>Normal occupancy is maximum up to two people per room. Additional person (if room size permits) may accommodate at an extra charge.</li>
              </ul>
              <h2>Deposit:</h2>
              <ul>
                <li>To confirm your reservations, a deposit equal to a minimum of one night's room rate, or 50% of the entire stay's whichever is higher is pre-requisite for guaranteed reservation. We accept American Express, Maestro, Visa and Master Card. For alternate arrangements, please contact the Hotel.</li>
                <li>For Corporate reservations secured by a company credit/debit card, the deposit requirement may be modified/waived depends on the discretion of the Hotel. Please enquire before making a reservation. Group bookings of four or more rooms require a 30-day cancellation notice for return of the deposit.</li>
              </ul>
              <h2>Cancellation & Early Checkin/Late Checkout Policy</h2>
              <p>Should your plans change, be sure to inform according to the following guidelines for a refund of your deposit. A cancellation number will be given to ensure proper return of the deposit. Cancellation charges will be deducted as follows:</p>
              <table className="table-auto border-collapse border border-amber-300 mb-6">
                <thead>
                  <tr>
                    <th className="border border-amber-300 px-4 py-2">Charges Deducted</th>
                    <th className="border border-amber-300 px-4 py-2">Cancellation prior to arrival</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-amber-300 px-4 py-2">5%</td>
                    <td className="border border-amber-300 px-4 py-2">If cancelled more than 04 days in advance.</td>
                  </tr>
                  <tr>
                    <td className="border border-amber-300 px-4 py-2">25%</td>
                    <td className="border border-amber-300 px-4 py-2">If cancelled more than 02 days and less than 04 days in advance.</td>
                  </tr>
                  <tr>
                    <td className="border border-amber-300 px-4 py-2">50%</td>
                    <td className="border border-amber-300 px-4 py-2">If cancelled more than 01 day and less than 02 days in advance.</td>
                  </tr>
                  <tr>
                    <td className="border border-amber-300 px-4 py-2">100%</td>
                    <td className="border border-amber-300 px-4 py-2">If cancelled less than 01 day in advance.</td>
                  </tr>
                </tbody>
              </table>
              <p>For early Check-in/late Checkout, you will be charged for full day reservation unless the remainder of the reservation cannot be re-booked. If still having doubts, please contact the hotel for clarification. Standard check-in time is 12:00 Noon and check out time is 11 AM.</p>
              <h2>Holding Your Reservation</h2>
              <p>Your reservation is not guaranteed if you arrive late. Please note that your room will only be guaranteed until 4:00 PM (unless the hotel is intimated formally for late arrival at least a day before the date of arrival) on the day of your expected arrival.</p>
              <h2>Refund Policy</h2>
              <p>When you cancel a booking and are entitled to a refund, we will instruct for the refund right away. The processing will take between 2-4 weeks until the amount reflects back on your credit/debit card statement. The refund amount solely depends on the hotel's cancellation policy. For more details, please refer to cancellation policy mentioned above. In case a reservation does not get confirmed, we will not charge anything on your credit/debit card and the whole amount will be released which was charged accidentally. However, this again will take 2-4 weeks to reflect the amount back on your card.</p>
              <p>Early check-in and check-out are possible on availability only available by prior arrangement only. Each is subject to an additional Rs.750 per hour.</p>
              <h2>Modification</h2>
              <p>Please note that a change in the length or dates of your reservation is strictly subject to room availability and may result in a rate change.</p>
              <h2>Children and Infants</h2>
              <p>Child (up to 8 years) can stay free of charge with parents using existing beds. No extra bed (or rollaway) and meal will be provided complimentary to a child under normal circumstances. The child's breakfast until 4 years of age is complementary and standard menu charges will be applicable otherwise. Apart from above, if you require an extra bed for a child up to 8 years old (extra bed mandatory for children above 08 years of age), an extra person rate will be applied for which you have to select "3 adults" instead of 2 adults and 1 child in the reservation form. Once you reserve the room under the rate for 03 adults, you will be entitled for 03 breakfasts, unless stated otherwise. Cots for infants are subject to availability and available on request.</p>
              <h2>Non-arrival to the Hotel (No Show)</h2>
              <p>If you fail to arrive at the hotel on the arrival date the entire reservation will be cancelled automatically and you will be charged for the whole reservation. If you fail to check in on the first day of the reservation, but continue your travel plan to stay at the hotel, you need to urgently contact the hotel formally so that reservation could be held for the remaining nights. If not as mentioned above, the entire reservation will be auto-cancelled and no refund will be made.</p>
              <h2>Shorten Stay (Early check-out)</h2>
              <p>Shorten stay is subject to the whole period charge whether or not you stay the whole period. If you are aware of a plan change beforehand, please contact us immediately to minimize hotel charges.</p>
              <h2>Special Request</h2>
              <p>Please note that not all requests are guaranteed as they are subject to availability upon arrival at the hotel. In case that there is an accessibility request (i.e. wheelchair accessible room), please contact us before submitting the reservation.</p>
              <h2>Voucher</h2>
              <p>At the time of reservation confirmation, a confirmation number and voucher is generated, print out of it must be taken. It is very important to produce the confirmation voucher upon arrival at the hotel, failure of which may lead to accommodation denial if the hotel is not able to fetch your booking details.</p>
              <h2>Payment Security</h2>
              <p>It is important for you to know that whenever you provide us with personal details or credit/debit card information is absolutely secured. Your credit/debit card number, name, address, and telephone number are protected by the latest security technology. Upon checkout, your credit/debit card information is directly transferred to the bank for necessary proceedings.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
