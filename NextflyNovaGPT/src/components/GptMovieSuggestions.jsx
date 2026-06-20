import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  // console.log(movieResults);

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            title={movieName}
            movies={movieResults[index]}
            key={movieName}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
