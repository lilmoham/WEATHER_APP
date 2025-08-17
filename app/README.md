# 🌤️ Modern Weather App

A beautiful, responsive weather application built with React that provides comprehensive weather information with a clean and classy design.

## ✨ Features

### 🌟 Core Functionality
- **Real-time Weather Data**: Current weather conditions with detailed metrics
- **5-Day Forecast**: Extended weather predictions with daily summaries
- **24-Hour Forecast**: Hourly weather data for detailed planning
- **City Search**: Smart autocomplete search for global locations
- **Geolocation**: Automatic weather detection for your current location

### 🎨 Modern UI/UX
- **Glass Morphism Design**: Beautiful translucent cards with backdrop blur
- **Dynamic Backgrounds**: Weather-responsive gradient backgrounds
- **Responsive Layout**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Accessibility**: Full keyboard navigation and screen reader support

### 📊 Weather Details
- **Temperature**: Current, feels like, min/max with unit conversion (°C/°F)
- **Atmospheric Data**: Humidity, pressure, visibility, wind speed & direction
- **Time Information**: Sunrise, sunset, and timezone-aware timestamps
- **Weather Status**: Visual indicators for weather conditions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### API Key Setup
1. **Get a free API key from OpenWeatherMap:**
   - Go to [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to the API Keys section in your dashboard
   - Copy your API key

2. **Configure environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your API key
   REACT_APP_WEATHER_API_KEY=your-actual-api-key-here
   ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lilmoham/WEATHER_APP.git
   cd WEATHER_APP/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 API Configuration

The app uses the **OpenWeatherMap API** for weather data. For security, API keys are stored in environment variables.

### Environment Variables
The API key is configured through environment variables:
```bash
REACT_APP_WEATHER_API_KEY=your-api-key-here
```

### Security Features
- ✅ **API key hidden from source code**
- ✅ **Environment variables used for configuration**
- ✅ **`.env` file excluded from Git**
- ✅ **Example configuration provided for setup**

### Free Tier Limits
- **1,000,000 API calls per month**
- **60 calls per minute**
- **No credit card required**
- Perfect for personal use and development

## 🧪 Testing Functionality

### ✅ Button Testing Checklist

#### 🔍 Search Functionality
- [x] **Search Bar**: Type city names (e.g., "London", "New York", "Tokyo")
- [x] **Autocomplete**: Shows city suggestions while typing
- [x] **City Selection**: Click on any suggested city
- [x] **Keyboard Navigation**: Use arrow keys and Enter
- [x] **Clear Search**: Click the × button to clear

#### 📍 Location Services
- [x] **Location Button**: Click "Use my location" 
- [x] **Permission Handling**: Properly handles location permissions
- [x] **Loading States**: Shows loading spinner while detecting
- [x] **Error Handling**: Shows error messages for failed location access

#### 🌡️ Temperature Controls
- [x] **Unit Toggle**: Click °F/°C button to switch units
- [x] **Instant Conversion**: Temperature updates immediately
- [x] **Persistent Units**: Remember unit preference

#### 🔄 Refresh & Updates
- [x] **Refresh Button**: Click 🔄 to update weather data
- [x] **Auto-refresh**: Data updates every 10 minutes automatically
- [x] **Loading Animation**: Spinning icon during refresh

#### 📅 Forecast Controls
- [x] **Daily/Hourly Toggle**: Switch between 5-day and 24-hour forecasts
- [x] **Active State**: Visual feedback for selected forecast type
- [x] **Data Loading**: Smooth transitions between forecast types

### 🌐 API Endpoints Tested

#### ✅ All API endpoints are working:
- **Current Weather**: `api.openweathermap.org/data/2.5/weather` ✅
- **5-Day Forecast**: `api.openweathermap.org/data/2.5/forecast` ✅
- **Geocoding**: `api.openweathermap.org/geo/1.0/direct` ✅
- **Reverse Geocoding**: `api.openweathermap.org/geo/1.0/reverse` ✅

### 📱 Responsive Testing

#### Screen Size Compatibility:
- [x] **Desktop** (1200px+): Full layout with sidebar details
- [x] **Tablet** (768px - 1199px): Adapted grid layout
- [x] **Mobile** (up to 767px): Stacked layout with touch-friendly controls

### 🎨 Visual Features

#### Dynamic Elements:
- [x] **Background Changes**: Based on weather conditions (clear, cloudy, rainy, etc.)
- [x] **Day/Night Themes**: Different gradients for day and night
- [x] **Weather Icons**: Emoji-based icons for all weather conditions
- [x] **Glass Morphism**: Translucent cards with backdrop blur effects

## 🛠️ Technical Implementation

### Architecture
```
src/
├── components/
│   ├── Search/           # Search bar and location button
│   ├── Weather/          # Weather display components
│   └── UI/              # Reusable UI components
├── hooks/               # Custom React hooks
├── services/            # API services
├── utils/               # Helper functions
└── constants/           # App configuration
```

### Key Technologies
- **React 19**: Latest React with hooks
- **CSS Modules**: Scoped styling
- **Fetch API**: Modern HTTP requests
- **Geolocation API**: Browser location services
- **CSS Grid & Flexbox**: Modern layouts

## 🔧 Configuration Options

### Weather Units
```javascript
// In src/constants/apiConfig.js
units: {
  metric: "metric",    // Celsius, m/s
  imperial: "imperial", // Fahrenheit, mph
  standard: "standard"  // Kelvin, m/s
}
```

### Update Intervals
```javascript
// In src/constants/apiConfig.js
APP_CONFIG: {
  refreshInterval: 600000, // 10 minutes
  debounceDelay: 300      // Search delay
}
```

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🚀 Production Build

```bash
npm run build
# Creates optimized production build in 'build' folder
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Enjoy your beautiful weather app!** 🌈

*Last updated: August 17, 2025*
