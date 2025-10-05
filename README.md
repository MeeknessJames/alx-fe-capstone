# Weather Dashboard

A modern, responsive weather dashboard built with React, Vite, and Tailwind CSS. Get real-time weather information and forecasts for any city worldwide.

## 🌟 Features

### Core Functionality
- **Real-time Weather Data**: Current weather conditions for any city
- **7-Day Forecast**: Extended weather forecast with hourly details
- **City Search**: Search for weather by city name
- **Geolocation**: Automatic weather detection based on your location
- **Multiple Units**: Support for both Celsius and Fahrenheit

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Recent Searches**: Quick access to previously searched cities
- **Auto Updates**: Automatic weather refresh every 5-15 minutes
- **Error Handling**: User-friendly error messages and retry options

### Advanced Features
- **Theme Toggle**: Light and dark mode support
- **Local Storage**: Saves user preferences and recent searches
- **Weather Icons**: Visual weather condition representations
- **Detailed Metrics**: Humidity, wind speed, pressure, visibility, and more
- **Sunrise/Sunset**: Daily sunrise and sunset times

## 🛠️ Technologies Used

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Context API
- **API**: OpenWeatherMap API
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🔧 API Configuration

### Getting an API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add the key to your `.env` file

### API Endpoints Used
- **Current Weather**: `/weather` - Get current weather data
- **5-Day Forecast**: `/forecast` - Get weather forecast
- **Geolocation**: `/weather?lat={lat}&lon={lon}` - Weather by coordinates

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Design Features

### Glassmorphism UI
- Translucent cards with backdrop blur
- Subtle borders and shadows
- Smooth animations and transitions

### Weather-Based Themes
- Dynamic backgrounds based on weather conditions
- Color-coded weather icons
- Adaptive UI elements

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## 🔄 Auto-Update System

The dashboard automatically refreshes weather data:
- **Default Interval**: 5 minutes
- **Configurable**: 5, 10, or 15 minutes
- **Manual Refresh**: Click the refresh button anytime
- **Smart Updates**: Only updates when tab is active

## 💾 Local Storage

The app saves the following data locally:
- **Recent Searches**: Last 5 searched cities
- **User Preferences**: Temperature unit, theme, auto-update settings
- **Update Interval**: Custom refresh frequency

## 🧩 Component Structure

```
src/
├── components/
│   ├── SearchBar.jsx          # City search with recent searches
│   ├── WeatherCard.jsx        # Main weather display
│   ├── Forecast.jsx           # 7-day forecast
│   ├── ErrorMessage.jsx       # Error handling
│   └── Settings.jsx           # User preferences
├── contexts/
│   └── WeatherContext.jsx     # Global state management
├── services/
│   └── weatherService.js      # API integration
└── App.jsx                    # Main application
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm run preview
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Efficient icon usage
- **Caching**: Smart API response caching

## 🔒 Security Features

- **Environment Variables**: API keys stored securely
- **Input Validation**: Sanitized user inputs
- **Error Boundaries**: Graceful error handling
- **Rate Limiting**: Respects API rate limits

## 🧪 Testing

The application includes:
- Form validation testing
- API integration testing
- Responsive design testing
- Cross-browser compatibility

## 📈 Future Enhancements

- **Weather Maps**: Interactive weather maps
- **Weather Alerts**: Severe weather notifications
- **Historical Data**: Past weather information
- **Multiple Locations**: Save favorite cities
- **Weather Widgets**: Embeddable weather widgets
- **Offline Support**: PWA capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development

---

**Live Demo**: [Deploy to Vercel](https://vercel.com/new)

**Repository**: [GitHub Repository](https://github.com/your-username/weather-dashboard)
