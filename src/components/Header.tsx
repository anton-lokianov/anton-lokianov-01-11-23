import { NavLink } from "react-router-dom";
import { TiWeatherShower } from "react-icons/ti";
import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import Button from "./ui/Button";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setTheme } from "../store/ui-slice";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";

const Header = () => {
  const isDarkMode = useSelector((state: RootState) => state.ui.theme);
  const dispatch = useDispatch();

  return (
    <header
      className={`flex items-center justify-between p-4  text-white ${
        isDarkMode ? "bg-blue-600" : "bg-blue-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <h1 className="hidden md:block text-2xl font-bold">Weather App</h1>
        <TiWeatherShower className="text-4xl" />
      </div>
      <div className="flex items-center gap-5">
        <motion.nav
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          animate={"show"} // Play animation if in view, reset otherwise
          exit="hidden"
          className="flex items-center gap-4"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav_link text-yellow-400 border-yellow-400"
                : "nav_link "
            }
          >
            <AiOutlineHome className="text-2xl" />
            <span className="hidden md:inline">Home</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "nav_link text-yellow-400 border-yellow-400"
                : "nav_link"
            }
          >
            <AiOutlineHeart className="text-2xl" />
            <span className="hidden md:inline">Favorites</span>
          </NavLink>
        </motion.nav>
        <Button
          className={`text-[1.6rem] ${
            isDarkMode
              ? "text-slate-800 border-slate-800"
              : "text-yellow-400 border-yellow-400"
          } transition duration-300 ease-in-out 
            hover:transform hover:scale-110 
            active:scale-90 active:text-yellow-600 active:border-yellow-600
            border-2 p-2 rounded-full `}
          onClick={() => {
            dispatch(setTheme(!isDarkMode));
          }}
        >
          {!isDarkMode ? <BsSun /> : <BsMoonStars />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
