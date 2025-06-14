# Hotel Patliputra Continental - Web Application

A modern hotel booking and management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏨 Hotel room browsing and booking
- 👤 User authentication and profile management
- 📅 Booking management system
- 🎨 Modern UI with responsive design
- 🔐 Secure authentication with token management
- 📱 Mobile-friendly interface

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** React Context

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hpc-main-web
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=your-api-url
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Environment Variables

Set these environment variables in your Vercel dashboard:

- `NEXT_PUBLIC_API_URL`: Your backend API URL

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── my-bookings/       # Bookings page
│   ├── profile/           # User profile
│   ├── rooms/             # Room listings
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── ...
├── context/              # React contexts
├── services/             # API services
├── types/                # TypeScript types
├── utils/                # Utility functions
└── config/               # Configuration files
```

## API Integration

The application integrates with a backend API for:
- User authentication
- Booking management
- Room data
- User profiles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary.