interface FavoritesCardProps {
  city: string;
  Temperature: {
    Metric: {
      Value: number;
    };
  };
  WeatherText: string;
}

const FavoritesCard = ({ favoritesCard }: FavoritesCardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-between bg-gray-700 rounded-lg text-slate-100 shadow-md hover:shadow-lg shadow-black hover:shadow-black 
    transition-shadow duration-300 cursor-pointer p-6 w-[250px] h-[350px]">
      <div className="flex flex-col items-center gap-7">
        <div className="text-[2.2rem] font-bold">{favoritesCard?.cityName}</div>
        <div className="text-[1.4rem]">
          {favoritesCard?.Temperature.Metric.Value}°C
        </div>
      </div>
      <div>
        <div className="text-[1.6rem] mb-9 text-slate-200 text-center font-semibold">
          {favoritesCard?.WeatherText}
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
