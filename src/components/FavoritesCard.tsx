import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { get5DayForecast } from "../utils/api";
import {
  setCurrentWeather,
  setForecast,
  setSearchQuery,
} from "../store/weather-slice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

interface FavoritesCardProps {
  city: string;
  Temperature: {
    Metric: {
      Value: number;
    };
  };
  WeatherText: string;
}

const FavoritesCard = ({ favoritesCard }: FavoritesCardProps) => {
  const isDarkMode = useSelector((state: RootState) => state.ui.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (!favoritesCard.id) {
        throw new Error("Favorite card is missing necessary data.");
      }

      dispatch(setCurrentWeather(favoritesCard));

      const forecastData = await get5DayForecast(favoritesCard.id);
      if (!forecastData) {
        throw new Error("Failed to fetch forecast data.");
      }

      dispatch(setForecast(forecastData));
      dispatch(setSearchQuery(favoritesCard.cityName)); // Assuming you have an action to set the search query

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      animate={"show"}
      exit="hidden"
      className={`flex flex-col items-center justify-between  rounded-lg text-slate-100 shadow-md hover:shadow-lg 
      ${
        isDarkMode
          ? "shadow-black hover:shadow-black bg-gray-700"
          : "bg-blue-800 hover:shadow-white shadow-white"
      }
    transition-shadow duration-300 cursor-pointer p-6 w-[250px] h-[350px]`}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-7">
        <div className="text-[2.2rem] font-bold">{favoritesCard?.cityName}</div>
        <div className="text-[1.4rem]">
          {Math.round(favoritesCard?.Temperature.Metric.Value)}°C
        </div>
      </div>
      <div>
        <div className="text-[1.6rem] mb-9 text-slate-200 text-center font-semibold">
          {favoritesCard?.WeatherText}
        </div>
      </div>
    </motion.div>
  );
};

export default FavoritesCard;
