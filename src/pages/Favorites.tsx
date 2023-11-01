import FavoritesCard from "../components/FavoritesCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Favorites = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return (
    <div>
      <div className="flex p-10 gap-8">
        {favorites.map((item: any) => (
          <FavoritesCard key={item.id} favoritesCard={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
