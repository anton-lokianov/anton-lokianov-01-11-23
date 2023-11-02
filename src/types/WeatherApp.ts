interface Temperature {
  Value: number;
  Unit: string;
  UnitType: number;
}

interface WeatherCondition {
  IconPhrase: string;
  Icon: number;
}

export interface DailyForecast {
  Date: string;
  Temperature: {
    Minimum: Temperature;
    Maximum: Temperature;
  };
  Day: WeatherCondition;
  Night: WeatherCondition;
}

export interface CurrentWeather {
  Temperature: {
    Metric: Temperature;
  };
  cityName: string;
  id: string;
  WeatherText: string;
  WeatherIcon: number;
  IsDayTime: boolean;
  LocalObservationDateTime: string;
  DailyForecasts: DailyForecast[];
}
