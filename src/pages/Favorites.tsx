import FavoritesCard from "../components/FavoritesCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Favorites = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isDarkMode = useSelector((state: RootState) => state.ui.theme);

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {favorites.length === 0 && (
          <h1
            className={`${
              isDarkMode ? "" : "text-slate-50"
            } text-[2rem] w-full text-center`}
          >
            You have no favorites yet
          </h1>
        )}
        {favorites.length > 0 &&
          favorites.map((item: any) => (
            <FavoritesCard key={item.id} favoritesCard={item} />
          ))}
      </div>
    </div>
  );
};

export default Favorites;
