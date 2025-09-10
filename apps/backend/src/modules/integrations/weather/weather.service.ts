import { Injectable } from '@nestjs/common';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  visibility: number;
  alerts: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

@Injectable()
export class WeatherService {
  async getWeatherAlongRoute(route: { origin: any; destination: any; waypoints?: any[] }): Promise<WeatherData[]> {
    // Mock weather data - replace with real weather API
    const conditions = ['Clear', 'Cloudy', 'Rain', 'Snow', 'Storm'];
    const alerts = ['Heavy Rain Warning', 'Snow Advisory', 'High Wind Alert'];
    
    return [
      {
        location: 'Origin City',
        temperature: 22,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        windSpeed: Math.floor(Math.random() * 30),
        visibility: Math.floor(Math.random() * 10) + 1,
        alerts: Math.random() > 0.7 ? [alerts[Math.floor(Math.random() * alerts.length)]] : [],
        riskLevel: this.calculateRiskLevel(),
      },
      {
        location: 'Destination City',
        temperature: 18,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        windSpeed: Math.floor(Math.random() * 25),
        visibility: Math.floor(Math.random() * 10) + 1,
        alerts: Math.random() > 0.8 ? [alerts[Math.floor(Math.random() * alerts.length)]] : [],
        riskLevel: this.calculateRiskLevel(),
      },
    ];
  }

  async getWeatherImpact(shipmentId: string): Promise<{ delayMinutes: number; riskFactors: string[] }> {
    const weatherData = await this.getWeatherAlongRoute({
      origin: { lat: 40.7128, lng: -74.0060 },
      destination: { lat: 34.0522, lng: -118.2437 },
    });

    let delayMinutes = 0;
    const riskFactors: string[] = [];

    weatherData.forEach(weather => {
      if (weather.condition === 'Storm') {
        delayMinutes += 120;
        riskFactors.push('Severe weather conditions');
      } else if (weather.condition === 'Snow') {
        delayMinutes += 60;
        riskFactors.push('Snow conditions');
      } else if (weather.windSpeed > 25) {
        delayMinutes += 30;
        riskFactors.push('High wind speeds');
      }
    });

    return { delayMinutes, riskFactors };
  }

  private calculateRiskLevel(): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const risk = Math.random();
    if (risk < 0.5) return 'LOW';
    if (risk < 0.8) return 'MEDIUM';
    if (risk < 0.95) return 'HIGH';
    return 'CRITICAL';
  }
}