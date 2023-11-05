import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React from "react";
import WeatherIcon from "./ui/WeatherIcon";

type ForecastCardProps = {
  forecast: any;
};

// Component to render the 5-day forecast for a given city
const ForecastCard = React.memo(({ forecast }: ForecastCardProps) => {
  const isLightMode = useSelector((state: RootState) => state.ui.theme);
  const temperatureUnit = useSelector(
    (state: RootState) => state.weather.temperatureUnit
  );

  if (!forecast) {
    return null;
  }

  const convertTemperature = (temperature: number, unit: string) => {
    return unit === "celsius"
      ? (((temperature - 32) * 5) / 9).toFixed(0) // Convert to Celsius
      : temperature.toFixed(0); // Keep as Fahrenheit
  };

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      {forecast.map((item: any, idx: number) => {
        const date = new Date(item.Date).toDateString();
        const minTemperature = convertTemperature(
          item.Temperature.Minimum.Value,
          temperatureUnit
        );
        const maxTemperature = convertTemperature(
          item.Temperature.Maximum.Value,
          temperatureUnit
        );
        return (
          <div
            className={`flex flex-col items-center p-4 ${
              isLightMode ? "bg-slate-700" : "bg-blue-900"
            } rounded-md shadow-lg transition-transform transform hover:scale-105 text-slate-50`}
            key={idx}>
            <span className="text-md font-bold">{date}</span>
            <WeatherIcon icon={item.Day.Icon} />
            <span className="mt-2">
              {minTemperature}°{temperatureUnit === "celsius" ? "C" : "F"} /{" "}
              {maxTemperature}°{temperatureUnit === "celsius" ? "C" : "F"}
            </span>
            <span className="mt-2 text-sm">{item.Day.IconPhrase}</span>
          </div>
        );
      })}
    </div>
  );
});

export default ForecastCard;
