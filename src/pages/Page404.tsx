import { NavLink } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const Page404 = () => {
  const isDarkMode = useSelector((state: RootState) => state.ui.theme);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className={`text-lg mb-8 ${isDarkMode ? "" : "text-slate-50"}`}>
        The page you are looking for does not exist.
      </p>
      <NavLink
        to="/"
        className="text-blue-500 hover:text-blue-700 hover:underline text-lg"
      >
        Go back to home
      </NavLink>
    </div>
  );
};

export default Page404;
