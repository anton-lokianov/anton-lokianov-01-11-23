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
import Button from "./ui/Button";
import { toggleSelectedFavorite } from "../store/favorites-slice";

// Component to render a single favorite card
const FavoritesCard = ({ favoritesCard }: any) => {
  const isLightMode = useSelector((state: RootState) => state.ui.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedFavorites = useSelector(
    (state: RootState) => state.favorites.selectedFavorites
  );
  const isChecked = selectedFavorites.includes(favoritesCard.id);

  const handleCheckboxChange = () => {
    dispatch(toggleSelectedFavorite(favoritesCard.id));
  };

  // Handler for when the card is clicked, navigates to the main weather view for this location
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

      dispatch(setSearchQuery(favoritesCard.cityName));

      navigate("/");
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={`relative flex flex-col items-center justify-between rounded-lg text-slate-100 shadow-md hover:shadow-lg ${
        isLightMode
          ? "shadow-black hover:shadow-black bg-gray-700"
          : "bg-blue-800 hover:shadow-white shadow-white"
      } transition-shadow duration-300 p-6 w-[250px] h-[350px]`}>
      <div className="absolute top-3 right-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={`form-checkbox h-5 w-5 rounded focus:ring-blue-500 cursor-pointer ${
            isLightMode
              ? "border-gray-300 text-blue-600"
              : "border-white text-slate-700"
          }`}
        />
      </div>
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
        <div className="flex justify-center">
          <Button
            onClick={handleClick}
            className={isLightMode ? "primaryBtn" : "primaryDarkBtn"}>
            see the weather
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FavoritesCard;
