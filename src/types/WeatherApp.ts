interface Temperature {
  Value: number;
  Unit: string;
}

interface WeatherCondition {
  IconPhrase: string;
}

export interface DailyForecast {
  Date: string;
  Temperature: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  Day: WeatherCondition;
}

export interface CurrentWeather {
  Temperature: {
    Metric: Temperature;
  };
  cityName: string;
}

export interface Forecast {
  DailyForecasts: DailyForecast[];
}
