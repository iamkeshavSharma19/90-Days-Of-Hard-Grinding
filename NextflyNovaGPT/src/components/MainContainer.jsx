import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import useElementalMovie from "../hooks/useElementalMovie";
import useHanumanMovie from "../hooks/useHanumanMovie";
import YouTube from "react-youtube";

import { useState } from "react";
import useHitMovie from "../hooks/useHitMovie";

const MainContainer = ({ pathname }) => {
  const [volume, setVolume] = useState(1);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  // this also known as Early Return
  // now let us show Elemental movie as the trailer...
  useElementalMovie();
  // now let us show the hanuman movie as trailer if the user clicks on tv & shows route
  useHanumanMovie();
  // const elementalMovie = useSelector(
  //   (store) => store.mainMovie?.elementalMovie
  // );
  // now let us show the hit 3 movie as trailer if the user clicks on indian movies route
  useHitMovie();
  const movieToPLay = useSelector((store) => {
    if (pathname === "/browse") {
      return store.mainMovie?.elementalMovie;
    } else if (pathname === "/tvShow") {
      return store.mainMovies?.HanumanMovie;
    } else if (pathname === "/indianMovies") {
      return store.mainMovies?.HitMovie;
    }
  });

  if (!movieToPLay) {
    return;
  }
  // console.log(movieToPLay);

  if (!movies) {
    return;
  }
  // console.log(movies);
  // const mainMovie = movies[0];
  // // console.log(mainMovie);
  // I will basically extract some details from my mainMovie
  const { title, overview, id } = movieToPLay;

  return (
    <div className="pt-[43%] bg-black md:pt-0">
      <VideoTitle
        title={title}
        overview={overview}
        volume={volume}
        setVolume={setVolume}
      />
      <VideoBackground movieId={id} volume={volume} setVolume={setVolume} />
    </div>
  );
};

export default MainContainer;
