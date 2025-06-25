"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CCAvenueSetupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Image src="/ccavenue-logo.png" alt="CCAvenue" width={120} height={40} className="mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4 text-blue-700">CCAvenue Payment Gateway</h1>
            <p className="mb-6 text-gray-700">
              You are about to be redirected to the CCAvenue payment gateway to complete your booking payment securely. Please click the button below to proceed.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              onClick={() => {
                // Example: Redirect to CCAvenue payment gateway
                // Replace the URL and params with your actual CCAvenue integration
                const ccAvenueUrl = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";
                // You may want to POST booking/payment details to your backend and get a payment URL/token
                window.location.href = ccAvenueUrl;
              }}
            >
              Proceed to Payment
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              If you have any issues, please contact our support team.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
