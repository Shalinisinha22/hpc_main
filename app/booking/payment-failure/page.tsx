"use client"

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { XCircle } from "lucide-react";

export default function PaymentFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    // Optionally clear sessionStorage or perform other actions
    sessionStorage.removeItem("pendingBookingId");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-serif text-red-700 mb-4">Payment Failed</h1>
            <p className="text-lg text-gray-600 mb-6">
              Unfortunately, your payment could not be processed. Please try again or choose another payment method.
            </p>
            {bookingId && (
              <div className="mb-4">
                <span className="font-medium text-amber-900">Booking ID:</span> {bookingId}
              </div>
            )}
            <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => router.push("/booking?bookingId=" + bookingId)}>
              Retry Payment
            </Button>
            <Button variant="outline" className="ml-2" onClick={() => router.push("/")}>Return to Home</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
