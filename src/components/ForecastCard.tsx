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
  if (!forecast) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      {forecast.map((item: any, idx: number) => {
        const date = new Date(item.Date).toDateString();
        const minTemperature = Math.round(item.Temperature.Minimum.Value);
        const maxTemperature = Math.round(item.Temperature.Maximum.Value);
        return (
          <div
            className={`flex flex-col items-center p-4 ${
              isLightMode ? "bg-slate-700" : "bg-blue-800"
            } rounded-md shadow-lg transition-transform transform hover:scale-105 text-slate-50`}
            key={idx}>
            <span className="text-md font-bold">{date}</span>
            <WeatherIcon icon={item.Day.Icon} />
            <span className="mt-2">
              {minTemperature}°F / {maxTemperature}°F
            </span>
            <span className="mt-2 text-sm">{item.Day.IconPhrase}</span>
          </div>
        );
      })}
    </div>
  );
});

export default ForecastCard;
