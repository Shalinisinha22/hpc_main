import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden flex items-center justify-center mb-8">
          <Image
            src="/banner.jpg"
            alt="Privacy Policy Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
          </div>
        </div>
        <div className="bg-white/95 border border-amber-200 rounded-2xl shadow-2xl p-4 sm:p-8 md:p-10 max-w-4xl mx-auto relative">
          <div className="prose max-w-none prose-amber prose-h1:text-[#bf840d] prose-h2:text-[#bf840d] prose-h3:text-[#bf840d] prose-h2:mb-6 prose-h3:mb-3 prose-li:mb-4 prose-p:mb-6 prose-ol:pl-8 prose-ol:mt-4 prose-ol:mb-8 prose-ul:pl-8 prose-ul:mt-4 prose-ul:mb-8 prose-strong:text-[#bf840d] prose-strong:font-semibold text-lg leading-relaxed">
            <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded">Arrival and Departure Policy</h2>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li><strong>Check-in</strong> - 12:00 Hours. Early arrival is subject to availability. For guaranteed early check-in, reservation needs to be made starting from the previous night.</li>
              <li><strong>Check-out</strong> - 11:00 Hours. Late check-outs are available on request and subject to availability.</li>
              <li>A recent Government notification requires guests to present proof of identity at the time of check-in. Guests are requested to carry with them the required document during their travel. In India the major documents, from which one can show at the time of checking-in at a hotel are Voter's ID card, Aadhar Card, driving license, passport any other documents issued by the government of India. One thing that everyone should keep in mind is that though PAN card is a photo id proof, it cannot be shown as an ID card at the time of checking-in.</li>
              <li>All bookings must be guaranteed at the time of reservation by a Credit Card or Travel Agency. All major credit cards are accepted.</li>
            </ul>

            <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Cancellation Policy</h2>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>Reservation must be cancelled 48 hours prior to the planned date of arrival. Reservations cancelled within 48 hours of the arrival date will incur a cancellation fee equivalent to one night's accommodation charge.</li>
            </ul>

            <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Child Policy</h2>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>Two children, up to 8 years of age can stay in the parent's room at no additional charge. However, a maximum of one extra bed can be placed in a room.</li>
              <li>One child over 8 but less than 12 years can stay in the parent's room. A child's bed is provided that is chargeable.</li>
              <li>If a child is above 12 years of age, a separate room will be required at the parent's applicable room rate.</li>
            </ul>

            <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">Facilities & Services</h2>
            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">With Our Compliments</h3>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>High-speed internet for up to two devices</li>
              <li>24-hours concierge</li>
              <li>Fitness centre</li>
              <li>Roof Top swimming pool</li>
              <li>A designated smoking area on every floor</li>
              <li>Non-smoking floors</li>
              <li>Car parking valet services</li>
              <li>Wake up call service</li>
              <li>Wheelchair assistance</li>
              <li>Facilities for disabled guests</li>
              <li>Elevator</li>
              <li>Shoe-polishing facility</li>
              <li>Shoehorn</li>
              <li>Slippers</li>
              <li>Iron and ironing board</li>
              <li>Dental kit</li>
              <li>Shaving kit</li>
              <li>Left luggage facility</li>
            </ul>
            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded mt-8">Rooms & Suites</h3>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>24-hours personalized butler service for Presidential Suite</li>
              <li>LCD television with satellite channels</li>
              <li>Well-appointed work desk</li>
              <li>DVD player</li>
              <li>Tea/coffee maker</li>
              <li>Fresh Fruit Platter, applicable on the non-discounted rate (Only for Suite Rooms)</li>
              <li>Bottled water</li>
              <li>Fresh flowers for Suite Rooms</li>
              <li>Well-appointed bathrooms with a basket of Ayurvedic toiletries by HPC</li>
              <li>Robes for Suite Rooms</li>
              <li>Hairdryer</li>
              <li>Stationery</li>
              <li>Telephone with a voice message</li>
              <li>Turndown services</li>
              <li>Choice of Hindi and English local newspapers</li>
              <li>Safe lockers provided on demand</li>
              <li>Electronic safe deposit box on request</li>
              <li>Wardrobe & luggage area</li>
              <li>Separate dry vanity area in a suite room</li>
              <li>Chocolate amenities applicable for non discounted rates</li>
            </ul>
            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded mt-8">Chargeable on Request</h3>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>Fully equipped 24-hour business centre</li>
              <li>24-hours laundry services</li>
              <li>24-hours doctor on call</li>
              <li>Airport transfer</li>
              <li>Restaurant</li>
            </ul>

            <h2 className="border-l-4 border-[#bf840d] pl-4 mb-6 text-2xl font-bold bg-[#fff8e6] py-2 rounded mt-10">THE HOTEL PATLIPUTRA CONTINENTAL LLP Privacy Policy</h2>
            <p className="mb-8">At HOTEL PATLIPUTRA CONTINENTAL LLP we endeavour to provide our guests outstanding services and experiences in our hotels and luxury residences around the world. We value your business and your faith in us in delivering you a superior level of service.<br />
            We recognize that privacy is important to our guests, and hence HOTEL PATLIPUTRA CONTINENTAL LLP's Privacy Policy explains our practices regarding the personal information we collect when you visit our hotels, restaurants, our website when you fill up a form and become a member of our loyalty program.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">YOUR CONSENT</h3>
            <p className="mb-8">We request you to carefully read this Privacy Policy and Terms and Conditions under the Legal tab before sharing personal information with us. By visiting our websites, we assume, your acceptance of the practices described in this policy document.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">SHOULD YOU WANT TO OPT-OUT</h3>
            <p className="mb-8">If we possess your contact information, we may want to keep you posted about our products, services, and events, through email. Should you prefer not to keep up to date with HOTEL PATLIPUTRA CONTINENTAL LLP news and latest information on services and receive such marketing materials, please send an email to.<br />
            Further, a user may withdraw the consent given to HOTEL PATLIPUTRA CONTINENTAL LLP on the website by communicating the same to us in writing. However, such withholding of information or withdrawal of consent may result in HOTEL PATLIPUTRA CONTINENTAL LLP not being able to provide services and facilities and HOTEL PATLIPUTRA CONTINENTAL LLP reserves its right to take appropriate action with respect to any obligations or in relation to any contract under which such personal information was sought.<br />
            We will update your preferences as soon as reasonably practical. However, do note, if you opt-out of HOTEL PATLIPUTRA CONTINENTAL LLP emailing list, as described here, we will not be able to remove your personal information from the databases of affiliates, franchisees or business partners with which we have already shared your personal information, prior to the date of your opt-out request.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">MINORS</h3>
            <p className="mb-8">We do not knowingly collect personal information from individuals under 18 years of age. As a parent or legal guardian, please do not to allow your children to submit personal information without your permission.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">OTHER INFORMATION</h3>
            <p className="mb-8">We do not knowingly collect information related to your racial or ethnic origin, political opinions, religious or other beliefs, health, criminal background or political affiliations unless it is volunteered by you.</p>

            <p className="mb-8">This Privacy Policy covers the following areas relating to the privacy of information provided by you:</p>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>PERSONAL INFORMATION COLLECTED BY HOTEL PATLIPUTRA CONTINENTAL LLP</li>
              <li>PURPOSE OF COLLECTION OF PERSONAL INFORMATION BY HOTEL PATLIPUTRA CONTINENTAL LLP</li>
              <li>TRANSFERRING YOUR PERSONAL INFORMATION</li>
              <li>NON-PERSONAL OR ANONYMOUS INFORMATION COLLECTED BY HOTEL PATLIPUTRA CONTINENTAL LLP</li>
              <li>LINKS TO WEBSITES OF THIRD PARTY MARKETERS</li>
              <li>PROTECTION OF YOUR PERSONAL INFORMATION</li>
              <li>HOW LONG DOES HOTEL PATLIPUTRA CONTINENTAL LLP RETAIN YOUR PERSONAL INFORMATION</li>
              <li>POLICY MODIFICATIONS</li>
              <li>DATA PRIVACY ISSUES AND WHOM TO CONTACT</li>
              <li>OTHER HOTEL PATLIPUTRA CONTINENTAL LLP PRIVACY POLICIES</li>
            </ul>

            <p className="mb-8">There are a number of situations in which your personal information may be gathered by HOTEL PATLIPUTRA CONTINENTAL LLP to serve you better. At various touchpoints with our guests, we may collect the following personal information including, but not limited to: your name and contact information; date of birth; how you prefer to be addressed in communication from HOTEL PATLIPUTRA CONTINENTAL LLP, preferred modes of communication; your job designation and business address; spouse name, anniversary, credit card details; member number of our loyalty programmes, membership numbers of frequent flyer or travel partner programmes you are enrolled in, your dates of arrival and departure from our hotels/restaurants/other outlets, your preferences when you stay or dine at HOTEL PATLIPUTRA CONTINENTAL LLP, your transaction history at HOTEL PATLIPUTRA CONTINENTAL LLP; offers you have availed of from third party marketers in response to a communication from HOTEL PATLIPUTRA CONTINENTAL LLP. We may also record details on guests who have stayed or dined with you at HOTEL PATLIPUTRA CONTINENTAL LLP, including their names and contact details.</p>

            <p className="mb-8">Besides the above, we may also collect the following:</p>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>Your preferences when you stay or dine at HOTEL PATLIPUTRA CONTINENTAL LLP. Such information may include details relating to health matters.</li>
              <li>Username and password selected by you when you register on our website or become a member of our loyalty programmes at our website.</li>
              <li>Your personal information and membership number and password when you enrol in our loyalty programmes online.</li>
              <li>Your arrival and departure dates, number of guests in the group, details of guest rooms and tariff details if you choose to reserve a room online.</li>
              <li>Details pertaining to your request for a proposal from our meeting planners through our websites.</li>
              <li>Your questions or comments.</li>
              <li>From time to time, our website may offer a feature that allows you to send an electronic postcard or otherwise share a message with a friend. To fulfil your request, HOTEL PATLIPUTRA CONTINENTAL LLP may require personal information about the person to whom you are sending an electronic postcard or message, including name and email address, along with the text of any message you choose to include. Using this feature is tantamount to entitling us to store and use the recipient's name and email address.</li>
            </ul>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">PURPOSE OF COLLECTION OF PERSONAL INFORMATION BY HOTEL PATLIPUTRA CONTINENTAL LLP</h3>
            <p className="mb-8">Your privacy is of utmost importance to us and we take it very seriously. We will use your personal information to improve our offerings and your experience on our website or at the Hotel, to provide you with the services you request from HOTEL PATLIPUTRA CONTINENTAL LLP, to help you make room reservations, to provide you with information about conferences and events at HOTEL PATLIPUTRA CONTINENTAL LLP, to send you promotional material on HOTEL PATLIPUTRA CONTINENTAL LLP services by email, direct mail and phone, to conduct surveys from time to time, to make you offer sourced from third parties, per your stated preferences or usage pattern exhibited at HOTEL PATLIPUTRA CONTINENTAL LLP. We may use any health-related information provided by you only to serve you better and meet your specific needs when you stay with HOTEL PATLIPUTRA CONTINENTAL LLP.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">TRANSFERRING YOUR PERSONAL INFORMATION</h3>
            <p className="mb-8">We do not sell or rent your contact information to other marketers. As a company, to ensure that you enjoy the same level of service across all our Hotels and luxury residences, owned or operated, we may share your personal information with hotels within HOTEL PATLIPUTRA CONTINENTAL LLP LLP as well as affiliates, franchisees, and business partners. While doing so, HOTEL PATLIPUTRA CONTINENTAL LLP will ensure that your personal information is handled and safeguarded as per this policy.</p>
            <p className="mb-8"><strong>Third parties:</strong><br />
            We use the services of third-party service providers to provide certain products and services like credit card billing, reservations services, call centre services, management of the loyalty programmes (HOTEL PATLIPUTRA CONTINENTAL LLP Inner Circle, HOTEL PATLIPUTRA CONTINENTAL LLP mass mailings, for which it is necessary to provide personal information. These parties are contractually prohibited from using the personal information for any purpose other than those specified by HOTEL PATLIPUTRA CONTINENTAL LLP. We may provide information that is non-personal, to certain service providers for their use on an aggregated basis for the purpose of performing their contractual obligations to us. HOTEL PATLIPUTRA CONTINENTAL LLP expressly prohibits the sale or transfer of any information to any party outside of HOTEL PATLIPUTRA CONTINENTAL LLP by such service providers.<br />
            From time to time HOTEL PATLIPUTRA CONTINENTAL LLP may partner with other companies to provide co-sponsored or co-branded promotions, products, and services and may share your information with our co-sponsor. For example, we may co-sponsor some prize draws, competitions or contests on our site with other companies or we may provide prizes for contests sponsored by other companies. If you enter one of these contests, we may share your information with our co-sponsor or the third party sponsor.<br />
            In the event of a merger, consolidation, sale, liquidation or transfer of assets, HOTEL PATLIPUTRA CONTINENTAL LLP in its sole and absolute discretion may transfer, sell or assign information collected, including without limitation, non-personal information and personal information, to one or more affiliated or unaffiliated third parties. HOTEL PATLIPUTRA CONTINENTAL LLP with or without prior notice to you may have to share your information in order to comply with applicable laws or respond to governmental inquiries or requests from public authorities or to comply with valid legal process, to protect the rights, privacy, safety or property of HOTEL PATLIPUTRA CONTINENTAL LLP, its guests, employees or the public or to permit us to pursue available remedies or limit the damages that we may sustain or to respond to an emergency.<br />
            If you use a corporate credit card, your billing information may be shared with your employer.<br />
            We may transfer your personal information to servers located outside the country in which you live or to affiliates or other trusted third parties based in other countries so that they may process personal information on our behalf. By using this website or otherwise providing HOTEL PATLIPUTRA CONTINENTAL LLP with personal information, you agree to us doing so in accordance with the terms of this. Privacy Policy and applicable data protection laws and regulations.<br />
            Kindly note that many countries do not afford the same legal protection to personal information as you might enjoy in your country of origin. While your personal information is in another country, it may be accessed by the courts, law enforcement, and national security authorities in that country in accordance with its laws. Subject to such lawful access requests, we promise that anyone processing your personal information outside of your country of origin is required to implement measures to protect it and is only entitled to process it in accordance with HOTEL PATLIPUTRA CONTINENTAL LLP's instructions.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">NON-PERSONAL OR ANONYMOUS INFORMATION COLLECTED BY HOTEL PATLIPUTRA CONTINENTAL LLP</h3>
            <p className="mb-8">Information that does not personally identify you is referred to as non-personal or anonymous information. When you visit and interact with the sites www.patliputracontinental.com or www.hpcpatna.com or third parties with whom HOTEL PATLIPUTRA CONTINENTAL LLP has contracted to provide services, non-personal information, like, list of website pages visited by you, could be collected. Technology like cookies could be used to help you deliver content per your preference, to help you process your reservations or other requests. While this cannot be used to disclose your identity, this information will identify your browser to our servers when you visit our site. To remove the cookies at any point from your computer, you can delete them using your browser.<br />
            We also may collect data by using web beacons, clear GIFS, pixel tags or similar means, which will tell us when you visit our site. Non-personal information like the domain name, the areas of the site you visit, your operating system, your browser version, and the URL you visited from, can be identified, which can be used to enhance your online experience by understanding your web usage patterns.<br />
            We may use or disclose non-personal information for any purpose from time to time since this does not personally identify you. For instance, we may embed e-mail addresses with images. In such cases where we combine non-personal information with personal information, the combined information will be treated by us as personal information as per this policy.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">LINKS to WEBSITES OF THIRD PARTY MARKETERS</h3>
            <p className="mb-8">From time to time, we may allow third-party advertisers to advertise on our websites. These third-party advertisers may use technologies like cookies, pixel tags to track which ads your browser has seen and which site pages you may have visited. HOTEL PATLIPUTRA CONTINENTAL LLP has no control over the use of this technology or the resulting information and is not responsible for any actions or policies of such third parties.<br />
            If at some point in the future our websites contain links to third parties' websites, so please note, that we will not be responsible for the collection, use, maintenance, sharing, or disclosure of data and information by such third parties. For information provided by you on third-party sites, the privacy policy and terms of service on those sites will be applicable and we strongly advise you to read the privacy policies of websites that you visit before submitting personal information.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">PROTECTION OF YOUR PERSONAL INFORMATION</h3>
            <p className="mb-8">HOTEL PATLIPUTRA CONTINENTAL LLP takes, and requires any third party to take, reasonable precautions, including administrative, technical and physical measures to safeguard your personal information against loss, theft, misuse, as well as unauthorized access, disclosure, alteration or destruction. Access to your personal information is restricted to prevent unauthorized access, modification or misuse and such access are only granted to our employees and agents on a need-to-know basis. However, unfortunately, no security system or system of transmitting data over the Internet can be guaranteed to be entirely secure. You can help us by also taking precautions to protect your personal data when you are on the Internet. For your own privacy protection, we advise you not to include sensitive personal information in any emails you may send to us. Please do not send credit card numbers or any sensitive personal information to us via email.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">HOW LONG DOES HOTEL PATLIPUTRA CONTINENTAL LLP RETAIN YOUR PERSONAL INFORMATION</h3>
            <p className="mb-8">HOTEL PATLIPUTRA CONTINENTAL LLP will retain your personal information for the period necessary to fulfil the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted/mandated by applicable law.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">POLICY MODIFICATIONS</h3>
            <p className="mb-8">HOTEL PATLIPUTRA CONTINENTAL LLP may update its privacy policy from time to time, without prior notice, and post it on the website.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">DATA PRIVACY ISSUES AND WHOM TO CONTACT</h3>
            <p className="mb-8">If you have any questions, comments or concerns about this. Privacy Policy or about how we handle your personal information, please get in touch with us at <a href="mailto:dgm@hpcpatna.com">dgm@hpcpatna.com</a>. Alternatively, you may also contact us by clicking the Contact Us link on the website and following the appropriate links thereon.</p>
            <p className="mb-8">You have the right to tell us if you:</p>
            <ul className="gap-4 border-l-2 border-amber-200 pl-6  py-4 rounded-lg">
              <li>do not wish to be contacted by us henceforth</li>
              <li>wish to obtain a copy of your personal information that we hold</li>
              <li>would like us to correct, update or delete your personal information in our records</li>
              <li>wish to report any misuse of your personal information</li>
            </ul>
            <p className="mb-8">To assist us in handling your request, please provide your full name and details.</p>

            <h3 className="border-l-4 border-[#bf840d] pl-4 mb-4 text-xl font-semibold bg-[#fff8e6] py-1 rounded">OTHER HOTEL PATLIPUTRA CONTINENTAL LLP PRIVACY POLICIES</h3>
            <p className="mb-8">In addition to this Privacy Policy, there may be other programs, initiatives, campaigns or promotions which will be governed by additional privacy terms or policies. Kindly read these additional terms or policies before participating in any such programs, initiatives campaigns or promotions as you will be deemed to have agreed, and required, to comply with them if you participate. Any additional privacy terms or policies will be made available to you at the relevant times.</p>
          </div>
          <div className="mt-8 text-center">
            <a href="/" className="text-[#bf840d] underline text-sm sm:text-base">Back to Home</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
