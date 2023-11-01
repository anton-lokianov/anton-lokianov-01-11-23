import { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import { AiOutlineSearch } from "react-icons/ai";
import {
  autocompleteLocation,
  get5DayForecast,
  getCurrentWeather,
} from "../utils/api";
import Weather from "../components/Weather";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  console.log(currentWeather);

  useEffect(() => {
    const fetchWeather = async () => {
      const query = debouncedSearchQuery || "Tel Aviv"; // Default to 'Tel Aviv'

      try {
        const locations = await autocompleteLocation(query);
        const locationKey = locations[0].Key;

        const currentWeatherData = await getCurrentWeather(locationKey);
        const extendedWeatherData = {
          ...currentWeatherData,
          cityName: locations[0].LocalizedName,
          id: locationKey,
        };
        console.log(extendedWeatherData);

        setCurrentWeather(extendedWeatherData);
        localStorage.setItem(
          `${query}-weather`,
          JSON.stringify(extendedWeatherData)
        );

        const forecastData = await get5DayForecast(locationKey);
        setForecast(forecastData);
        localStorage.setItem(`${query}-forecast`, JSON.stringify(forecastData));
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeather();
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="py-12 flex flex-col">
      <div className="flex justify-center">
        <Input
          className="min-w-[20rem]"
          icon={<AiOutlineSearch />}
          placeholder="Search for city"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Weather currentWeather={currentWeather} forecast={forecast} />
    </main>
  );
};

export default Home;
