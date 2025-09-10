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
    try {
      const weatherData: WeatherData[] = [];
      
      // Get weather for origin
      const originWeather = await this.getWeatherForLocation(route.origin);
      weatherData.push(originWeather);
      
      // Get weather for waypoints if any
      if (route.waypoints) {
        for (const waypoint of route.waypoints) {
          const waypointWeather = await this.getWeatherForLocation(waypoint);
          weatherData.push(waypointWeather);
        }
      }
      
      // Get weather for destination
      const destinationWeather = await this.getWeatherForLocation(route.destination);
      weatherData.push(destinationWeather);
      
      return weatherData;
    } catch (error) {
      console.error('Weather API error:', error);
      return this.getMockWeatherData();
    }
  }

  private async getWeatherForLocation(location: { lat: number; lng: number; name?: string }): Promise<WeatherData> {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    
    const data = await response.json();
    
    return {
      location: location.name || data.name,
      temperature: Math.round(data.main.temp),
      condition: this.mapWeatherCondition(data.weather[0].main),
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
      alerts: await this.getWeatherAlerts(location.lat, location.lng),
      riskLevel: this.calculateWeatherRisk(data),
    };
  }

  private async getWeatherAlerts(lat: number, lng: number): Promise<string[]> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_API_KEY}&exclude=minutely,hourly,daily`
      );
      
      const data = await response.json();
      return data.alerts?.map((alert: any) => alert.event) || [];
    } catch (error) {
      return [];
    }
  }

  private mapWeatherCondition(condition: string): string {
    const conditionMap: { [key: string]: string } = {
      'Clear': 'Clear',
      'Clouds': 'Cloudy',
      'Rain': 'Rain',
      'Drizzle': 'Rain',
      'Thunderstorm': 'Storm',
      'Snow': 'Snow',
      'Mist': 'Foggy',
      'Fog': 'Foggy',
    };
    return conditionMap[condition] || condition;
  }

  private calculateWeatherRisk(weatherData: any): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const condition = weatherData.weather[0].main;
    const windSpeed = weatherData.wind.speed * 3.6; // km/h
    const visibility = weatherData.visibility / 1000; // km
    
    if (condition === 'Thunderstorm' || windSpeed > 50 || visibility < 1) {
      return 'CRITICAL';
    } else if (condition === 'Snow' || condition === 'Rain' || windSpeed > 30 || visibility < 3) {
      return 'HIGH';
    } else if (condition === 'Clouds' || windSpeed > 20 || visibility < 5) {
      return 'MEDIUM';
    }
    return 'LOW';
  }

  private getMockWeatherData(): WeatherData[] {
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