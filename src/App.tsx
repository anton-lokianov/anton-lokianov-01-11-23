import { RouterProvider } from "react-router-dom";
import { routes } from "./layout/MainRoutes";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const isDarkMode = useSelector((state: RootState) => state.ui.theme);

  return (
    <div className={`min-h-screen ${isDarkMode ? "" : "bg-slate-800"}`}>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
