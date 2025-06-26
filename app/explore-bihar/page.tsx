"use client";

import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

const exploreDestinations = [
	{
		name: "Mahabodhi Temple, Bodh Gaya",
		description:
			"A UNESCO World Heritage site and one of the most important Buddhist pilgrimage centers in the world.",
		image:
			"https://cdn.getyourguide.com/img/tour/d3ece1033c08c32e0053fe0e52dd497d5c663170ee12ae0a9b781de3519dbefb.jpg/145.jpg",
		coords: { lat: 24.6951, lng: 84.9914 },
	},
	{
		name: "Nalanda University Ruins",
		description:
			"The ancient center of learning, renowned for its architectural and historical significance.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg",
		coords: { lat: 25.1357, lng: 85.4436 },
	},
	{
		name: "Great Buddha Statue, Bodh Gaya",
		description: "A 25-meter tall statue symbolizing peace and spirituality.",
		image:
			"https://cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/LZI5P4XGXBENJILAROAWWMFRSI.jpg",
		coords: { lat: 24.6959, lng: 84.9916 },
	},
	{
		name: "Golghar, Patna",
		description: "A unique granary and iconic landmark of Patna.",
		image:
			"https://s7ap1.scene7.com/is/image/incredibleindia/gol-ghar-patna-bihar-3-attr-hero?qlt=82&ts=1726740434905",
		coords: { lat: 25.6121, lng: 85.1376 },
	},
	{
		name: "Takht Sri Patna Sahib",
		description:
			"A sacred Sikh pilgrimage site, the birthplace of Guru Gobind Singh Ji.",
		image:
			"https://tourism.bihar.gov.in/content/dam/bihar-tourism/images/category_a/patna/takht_sri_harmandir_sahib/gurudwara_sri_harmandir_sahib__36.jpg/jcr:content/renditions/cq5dam.web.480.480.jpeg",
		coords: { lat: 25.6207, lng: 85.2307 },
	},
	{
		name: "Sher Shah Suri Tomb, Sasaram",
		description: "A grand mausoleum built in honor of Sher Shah Suri.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/2/27/%22_Tomb_of_Sher_Shah_Suri_%22.jpg",
		coords: { lat: 24.9506, lng: 84.0287 },
	},
	{
		name: "Ruins of Vikramshila University",
		description:
			"Another ancient university, known for its Buddhist learning and culture.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Vikramshila_2012-08-10-17.14.08.jpg/800px-Vikramshila_2012-08-10-17.14.08.jpg",
		coords: { lat: 25.3956, lng: 87.0173 },
	},
];

const HOTEL_COORDS = { lat: 25.6154, lng: 85.1415 };

function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
	const toRad = (x: number) => (x * Math.PI) / 180;
	const R = 6371;
	const dLat = toRad(lat2 - lat1);
	const dLng = toRad(lng2 - lng1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return Math.round(R * c);
}

export default function ExploreBiharPage() {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header />
			<main className="flex-grow container mx-auto px-4 py-12">
				<h1 className="text-4xl md:text-5xl font-serif text-[#bf840d] mb-8 text-center">
					Explore Bihar
				</h1>
				<p className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
					Discover the rich heritage, spiritual landmarks, and vibrant culture of
					Bihar. Here are some must-visit destinations to make your journey
					memorable.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{exploreDestinations.map((dest, idx) => (
						<div
							key={idx}
							className="bg-gradient-to-br from-[#fff7e6] to-[#fff] rounded-xl shadow-lg overflow-hidden border border-[#bf840d]/20 flex flex-col"
						>
							<div className="relative h-56 w-full">
								<Image
									src={dest.image}
									alt={dest.name}
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-6 flex-1 flex flex-col">
								<h2 className="text-2xl font-serif text-[#bf840d] mb-2">
									{dest.name}
								</h2>
								<p className="text-gray-700 mb-2 flex-1">
									{dest.description}
								</p>
								<p className="text-sm text-amber-700 mb-4">
									{dest.coords
										? `${getDistanceKm(
												HOTEL_COORDS.lat,
												HOTEL_COORDS.lng,
												dest.coords.lat,
												dest.coords.lng
										  )} km from hotel`
										: ""}
								</p>
								<Button
									className="bg-[#bf840d] hover:bg-[#a06f0b] text-white w-full mb-2"
									onClick={() => {
										if (dest.coords) {
											const hotel = `${HOTEL_COORDS.lat},${HOTEL_COORDS.lng}`;
											const place = `${dest.coords.lat},${dest.coords.lng}`;
											window.open(
												`https://www.google.com/maps/dir/?api=1&origin=${hotel}&destination=${place}&travelmode=driving`,
												"_blank"
											);
										}
									}}
								>
									Get Directions
								</Button>
								<Button
									variant="outline"
									className="border-[#bf840d] text-[#bf840d] hover:bg-[#bf840d] hover:text-white w-full"
									onClick={() => {
										if (dest.coords) {
											window.open(
												`https://www.google.com/maps/search/?api=1&query=${dest.coords.lat},${dest.coords.lng}`,
												"_blank"
											);
										}
									}}
								>
									View on Map
								</Button>
							</div>
						</div>
					))}
				</div>
				<div className="mt-16 text-center">
					<Button
						className="bg-[#bf840d] hover:bg-[#a06f0b] text-white px-8 py-6 text-lg"
						onClick={() => (window.location.href = "/")}
					>
						Return to Home
					</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
