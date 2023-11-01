import { FaCloudSun } from "react-icons/fa";

type WeatherCardProps = {
  forecast: any;
};

const WeatherCard = ({ forecast }: WeatherCardProps) => {
  if (!forecast) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid lg:grid-cols-5 gap-4">
      {forecast.map((item: any) => {
        const date = new Date(item.Date).toDateString();
        const minTemperature = Math.round(item.Temperature.Minimum.Value);
        const maxTemperature = Math.round(item.Temperature.Maximum.Value);
        return (
          <div
            className="flex flex-col items-center p-4 bg-slate-700 rounded-md shadow-lg transition-transform transform hover:scale-105 text-slate-50"
            key={item.id}>
            <span className="text-md font-bold">{date}</span>
            <span className="mt-2 text-2xl text-slate-400">
              <FaCloudSun />
            </span>
            <span className="mt-2">
              {minTemperature}°C / {maxTemperature}°C
            </span>
            <span className="mt-2 text-sm">{item.Day.IconPhrase}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherCard;
