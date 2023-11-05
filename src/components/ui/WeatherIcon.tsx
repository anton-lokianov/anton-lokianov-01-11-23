import { ReactElement } from "react";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindy,
} from "react-icons/ti";

type IconType = {
  [key: number]: ReactElement;
};

const icons: IconType = {
  1: <TiWeatherSunny />,
  2: <TiWeatherPartlySunny />,
  3: <TiWeatherPartlySunny />,
  4: <TiWeatherCloudy />,
  5: <TiWeatherWindy />,
  6: <TiWeatherCloudy />,
  7: <TiWeatherCloudy />,
  8: <TiWeatherDownpour />,
  11: <TiWeatherShower />,
  12: <TiWeatherShower />,
  13: <TiWeatherDownpour />,
  14: <TiWeatherPartlySunny />,
  15: <TiWeatherStormy />,
  17: <TiWeatherPartlySunny />,
  18: <TiWeatherDownpour />,
  19: <TiWeatherSnow />,
  21: <TiWeatherPartlySunny />,
  22: <TiWeatherSnow />,
  23: <TiWeatherSnow />,
  24: <TiWeatherWindy />,
  25: <TiWeatherDownpour />,
  26: <TiWeatherDownpour />,
};

const WeatherIcon = ({ icon }: { icon: number }) => {
  const weatherIcon = icons[icon] || "No icon found";
  return <span className="text-2xl text-slate-400">{weatherIcon}</span>;
};

export default WeatherIcon;
