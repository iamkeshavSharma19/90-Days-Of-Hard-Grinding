import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useLocation } from "react-router-dom";
import useTopSouthMovies from "../hooks/useTopSouthMovies";
import GptSearch from "./GptSearch";

const Browse = () => {
  const { pathname } = useLocation();
  // console.log(pathname);
  // calling the custom hook

  useNowPlayingMovies();
  // calling the custom hook for using the popular movies
  usePopularMovies();
  // calling the custom hook for using the Top Trending Movies
  useTrendingMovies();
  // calling the custom hook for using the Top Rated Movies
  useTopRatedMovies();
  // calling the custom hook for calling the Upcoming Movies
  useUpcomingMovies();
  // calling the custom hook for using the Top South Movies
  useTopSouthMovies();
  return (
    <div>
      {/* Let us create our header inside our browse page */}
      <Header />

      <MainContainer pathname={pathname} />
      <SecondaryContainer pathname={pathname} />
      

      {/*
         MainContainer
           - VideoBackground
           - VideoTile
         SecondaryContainer
           - MovieList * n
              - cards * n
       */}
    </div>
  );
};

export default Browse;
