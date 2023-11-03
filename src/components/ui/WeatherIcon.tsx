import { ReactElement } from "react";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherWindy,
} from "react-icons/ti";

type IconType = {
  [key: number]: ReactElement;
};

const icons: IconType = {
  1: <TiWeatherSunny />,
  2: <TiWeatherPartlySunny />,
  3: <TiWeatherCloudy />,
  4: <TiWeatherWindyCloudy />,
  5: <TiWeatherWindy />,
  6: <TiWeatherSnow />,
  7: <TiWeatherStormy />,
  8: <TiWeatherDownpour />,
  11: <TiWeatherShower />,
};

const WeatherIcon = ({ icon }: { icon: number }) => {
  const weatherIcon = icons[icon] || <TiWeatherSunny />;
  return <span className="text-2xl text-slate-400">{weatherIcon}</span>;
};

export default WeatherIcon;
