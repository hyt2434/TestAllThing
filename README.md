# VietTravel - Vietnam Travel Booking Platform

A modern travel booking platform focusing on Vietnam's tours, restaurants, lodging, and transportation options.

## Features

- **Modern UI**: Built with React + Vite and Tailwind CSS with a premium aesthetic design system
- **Responsive Design**: Fully responsive layout for all devices
- **Dark Mode**: Toggle between light and dark modes with system preference detection
- **Animated UI**: Smooth animations and micro-interactions using Framer Motion
- **Mock API**: Mock services that simulate real API calls (no backend required)

## Home Page Sections

1. **Header**: Navigation, dark mode toggle, and authentication
2. **Hero Search**: Search functionality with province selection, date picker, and popular keywords
3. **Highlights Carousel**: Featured tours and experiences
4. **Active Promotions**: Current promotional deals and offers
5. **Weather Suggestions**: Weather-based activity recommendations
6. **Social Snapshot**: User-generated content in a masonry layout
7. **Footer**: Quick links, legal info, and social media

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/viettravel.git
cd viettravel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Build for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Project Structure

- `/src/components/ui/` - Reusable UI components
- `/src/components/home/` - Home page section components
- `/src/hooks/` - Custom hooks including dark mode
- `/src/lib/api/` - Mock API services
- `/src/pages/` - Main page components
- `/src/styles/` - Global styles and theme
