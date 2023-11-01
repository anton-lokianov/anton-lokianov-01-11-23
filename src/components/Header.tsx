import { NavLink } from "react-router-dom";
import { TiWeatherShower } from "react-icons/ti";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-700 text-white">
      <div className="flex items-center gap-3">
        <h1 className="hidden md:block text-2xl font-bold">Weather App</h1>
        <TiWeatherShower className="text-4xl" />
      </div>

      <nav className="flex items-center gap-4">
        <NavLink to="/" className="flex items-center gap-2">
          <AiOutlineHome className="text-2xl" />
          <span className="hidden md:inline">Home</span>
        </NavLink>

        <NavLink to="/favorites" className="flex items-center gap-2">
          <AiOutlineHeart className="text-2xl" />
          <span className="hidden md:inline">Favorites</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
