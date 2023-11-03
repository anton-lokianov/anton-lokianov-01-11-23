import FavoritesCard from "../components/FavoritesCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "../components/ui/Button";
import { removeSelectedFavorites } from "../store/favorites-slice";

const Favorites = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const selectedFavorites = useSelector(
    (state: RootState) => state.favorites.selectedFavorites
  );
  const isLightMode = useSelector((state: RootState) => state.ui.theme);
  const dispatch = useDispatch();

  const handleRemoveSelected = () => {
    dispatch(removeSelectedFavorites(selectedFavorites));
  };

  return (
    <div className="p-4">
      {selectedFavorites.length > 0 && (
        <div className="flex justify-center mb-6">
          <Button
            className={isLightMode ? "primaryBtn" : "primaryDarkBtn"}
            onClick={handleRemoveSelected}
          >
            Remove From Favorites
          </Button>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        {favorites.length === 0 && (
          <h1
            className={`${
              isLightMode ? "" : "text-slate-50"
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
