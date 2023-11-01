import { FaCity } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import WeatherCard from "./WeatherCard";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favorites-slice";
import { RootState } from "../store/store";

type WeatherProps = {
  currentWeather: any;
  forecast: any;
};

const Weather = ({ currentWeather, forecast }: WeatherProps) => {
  const roundedTemperature = Math.round(
    currentWeather?.Temperature.Metric.Value
  );
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = favorites.some((fav) => fav.id === currentWeather?.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(currentWeather.id));
    } else {
      dispatch(addFavorite(currentWeather));
    }
  };

  return (
    <div className="flex justify-center mt-7 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col p-12 backdrop-blur-md bg-opacity-40 bg-white border border-gray-200 rounded-md shadow-lg gap-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-[8rem]">
                <FaCity />
              </span>
              <div className="flex flex-col justify-center ml-4 gap-2">
                <span className="text-[1.3rem]">
                  {currentWeather?.cityName}
                </span>
                <span className="text-[1.3rem]">{roundedTemperature}°C</span>
              </div>
            </div>
            <div className="flex items-center gap-5 border border-black px-2 rounded-md py-1 shadow-inner shadow-black">
              <span className="text-red-500 lg:text-[2.7rem]">
                <AiFillHeart />
              </span>
              <button
                onClick={handleToggleFavorite}
                className="flex items-center gap-3 bg-blue-500 px-3 py-[6px] rounded-md shadow-sm text-white 
              transition duration-300 ease-in-out 
              hover:bg-blue-600 hover:shadow-md 
              active:bg-blue-700 active:scale-95 active:shadow-lg">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </button>
            </div>
          </div>
          <h1 className="text-[3rem] text-center">Scattered Clouds</h1>
          <WeatherCard forecast={forecast} />
        </div>
      </div>
    </div>
  );
};

export default Weather;
