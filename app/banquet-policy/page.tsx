"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function BanquetPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f2]">
      <Header />
      <main className="flex-1">
        <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden flex items-center justify-center mb-8">
          <Image
            src="/banner.jpg"
            alt="Banquet Policy Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">Banquet Policy</h1>
          </div>
        </div>
        <div className="container mx-auto px-2 md:px-4 py-8">
          <div className="bg-white/95 border border-amber-200 rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10 max-w-4xl mx-auto relative">
            <div className="prose max-w-none prose-amber text-gray-800 prose-h1:text-[#bf840d] prose-h2:text-[#bf840d] prose-h3:text-[#bf840d] prose-h2:mb-6 prose-h3:mb-3 prose-li:mb-4 prose-p:mb-6 prose-ol:pl-8 prose-ol:mt-4 prose-ol:mb-8 prose-ul:pl-8 prose-ul:mt-4 prose-ul:mb-8 prose-strong:text-[#bf840d] prose-strong:font-semibold text-lg leading-relaxed">
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded">Service Details</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
                <li>Dedicated floor manager will be assigned.</li>
                <li>Buffet dinner in a pre-designated area.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">DJ Timing</h2>
              <p className="mb-8">As per the directive of the Honourable Supreme Court of India, playing loud music and live or recorded musical performance or recital is not permitted beyond 22:00 hrs at an outdoor venue and 23:30hrs at an indoor venue. All music/musical performances will be shut down at stipulated times by the court's directive. If DJ is to be played beyond the stipulated time, the client will bear the responsibility.</p>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">DJ Charges (Optional)</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
                <li>The Banquet will provide instrumental background music for your listening pleasure in the lobby. Should you have special requests like a live band, DJ, Orchestra, etc. the same can be arranged at an additional cost.</li>
                <li>DJ charges will be applicable extra.</li>
                <li>PPL / IPRS certificate has to be arranged by the Guest. If the guest fails to submit the same, the client will bear responsibility. Banquet Management will not be responsible for any consequences.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Audio Visuals</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
                <li>We have a highly qualified Technical crew who will be present throughout your function for all assistance that you may have.</li>
                <li>All audio-visual equipment is available on a chargeable basis based on your requirement.</li>
                <li>Up to 1 KV Power supply per function room is provided at no extra cost. Should you require more power supply we are pleased to have this arranged at an additional cost.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Hall Decoration</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6 py-4 rounded-lg">
                <li>We have our Monopoly of decorators who will help & guide you in finalizing the decoration & special arrangements for your function.</li>
                <li>Decoration & other special arrangements would be charged separately as per the requirement of the guest/s.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Billing/Advance Policy</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6 py-4 rounded-lg">
                <li>50% of the estimated bill of the event is to be confirmed at the time of the event along with a signed copy of the contract mentioning terms and conditions.</li>
                <li>Balance of 50% of the estimated billing should be paid 15 days before the commencement of the Event.</li>
                <li>Bills for the extras and other miscellaneous charges are to be settled with the refundable deposit, which is to be paid in advance with your final payment.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Refundable Policy</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
                <li>Refundable deposit as per contract to be paid in advance with final payment.</li>
                <li>Refundable deposit will be returned after 2 working days of event completion.</li>
                <li>Any damage/loss/misplacement to the property will be checked and verified, post, which the amount will be deducted and refunded accordingly.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Cancellation/Refund Policy</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
                <li>In case of a cancellation 90 days before the commencement of the function, the banquet reserves the right to charge 25% of the total estimated billing as retention.</li>
                <li>In case of a cancellation between 90 days and 30 days before the commencement of the function, the banquet reserves the right to charge 50% of the total estimated billing as retention.</li>
                <li>In case of a cancellation less than 30 days before the commencement of the function, the banquet reserves the right to charge 100% of the expected bill as retention.</li>
                <li>If any postponement of the event is done within 30 days of the scheduled date, it would be treated as a cancellation and the above guidelines would apply.</li>
                <li>In case of any No-Shows, the Banquet reserves the right to charge 100% of the expected bill as retention.</li>
                <li>If the event is cancelled, GST will be deducted from the refund amount.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Confirmation of Booking</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6 py-4 rounded-lg">
                <li>Hotel Patliputra Continental LLP reserves the right to cancel any tentative booking, which is not confirmed by the client.</li>
                <li>Booking will only be considered as confirmed once the advance payment is received.</li>
              </ul>
              <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Please Note</h2>
              <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
                <li>Menu has to be closed a week before the event date.</li>
                <li>Minimum guarantee needs to be confirmed at the time of agreeing on the terms of this quotation. Charges will apply as per the minimum guarantee or an actual number of people attending, whichever is higher.</li>
                <li>Caterer takes responsibility for only a 10% increase in dishes of the minimum guarantee.</li>
                <li>Banquet is not responsible for a power failure during the function and in such cases client will not be entertained for any refund or discount.</li>
                <li>Banquet is not responsible for any loss or theft of guests' belongings.</li>
                <li>Putting tapes or nails etc. on the walls or ceilings is strictly prohibited.</li>
                <li>Smoking on the premise is strictly prohibited. If found, a penalty of ₹ 1000/- will be charged.</li>
                <li>Rates are subject to change without prior notice.</li>
                <li>Subject to Thane Jurisdiction.</li>
                <li>Aadhar and PAN is mandatory while booking.</li>
              </ul>
            </div>
            <div className="mt-8 text-center">
              <a href="/" className="text-[#bf840d] underline text-sm sm:text-base">Back to Home</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
