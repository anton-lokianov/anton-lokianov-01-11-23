import { FaCity } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import ForecastCard from "./ForecastCard";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favorites-slice";
import { RootState } from "../store/store";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";
import React from "react";

type WeatherDataProps = {
  currentWeather: any;
  forecast: any;
};

// display the current weather data for a given city
const WeatherData = React.memo(
  ({ currentWeather, forecast }: WeatherDataProps) => {
    const roundedTemperature = Math.round(
      currentWeather?.Temperature.Metric.Value
    );
    const dispatch = useDispatch();
    const isLightMode = useSelector((state: RootState) => state.ui.theme);
    const favorites = useSelector(
      (state: RootState) => state.favorites.favorites
    );
    const isFavorite = favorites.some((fav) => fav.id === currentWeather?.id);

    // Handler for adding or removing the current city from favorites
    const handleToggleFavorite = () => {
      if (!currentWeather) return;
      if (isFavorite) {
        dispatch(removeFavorite(currentWeather.id));
      } else {
        dispatch(addFavorite(currentWeather));
      }
    };

    return (
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        animate={"show"}
        exit="hidden"
        className="flex justify-center mt-7 px-4">
        <div className="container mx-auto">
          <div
            className={`flex flex-col p-4 sm:p-8 md:p-12 backdrop-blur-md bg-[rgba(255,255,255,0.1)] bg-opacity-20 bg-white border border-gray-200 rounded-md shadow-lg gap-4 sm:gap-8 md:gap-20 ${
              isLightMode ? "" : "text-slate-50"
            } `}>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-6xl sm:text-[8rem]">
                  <FaCity />
                </span>
                <div className="flex flex-col justify-center ml-4 gap-2">
                  <span className="text-lg sm:text-[1.3rem]">
                    {currentWeather?.cityName}
                  </span>
                  <span className="text-lg sm:text-[1.3rem]">
                    {roundedTemperature ? `${roundedTemperature + "°C"}` : ""}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-5 border border-black px-2 rounded-md py-1 shadow-inner shadow-black">
                <span className="text-red-500 text-2xl sm:text-[2.7rem]">
                  <AiFillHeart />
                </span>
                <Button
                  onClick={handleToggleFavorite}
                  className={isLightMode ? "primaryBtn" : "primaryDarkBtn"}>
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </Button>
              </div>
            </div>
            <h1 className="text-2xl sm:text-[3rem] text-center">
              Scattered Clouds
            </h1>
            <ForecastCard forecast={forecast} />
          </div>
        </div>
      </motion.div>
    );
  }
);

export default WeatherData;
