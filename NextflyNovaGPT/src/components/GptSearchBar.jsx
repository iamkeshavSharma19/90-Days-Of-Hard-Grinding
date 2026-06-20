import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
// import openai from "../utils/openai";
import { GoogleGenAI } from "@google/genai";
import { API_OPTIONS, OPEN_KEY } from "../utils/constants";
import { addGptMovie } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  // const handleGptSearchClick = () => {
  //   // console.log(searchText.current.value);

  //   // // Make an API call to GPT API and get Movie Results

  //   // const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query :" + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, sholay, Don, Golmaal, Koi Mil Gaya";
  //   // const gptResults = await openai.chat.completions.create({
  //   //   model: "gpt-3.5-turbo",
  //   //   messages: [
  //   //     // { role: "developer", content: "Talk like a pirate." },
  //   //     { role: "user", content: gptQuery },
  //   //   ],
  //   // });

  //   // console.log(gptResults.choices);
  //   // using putter.js
  //   puter.ai
  //     .chat(`What is life?`, { model: "gpt-5-nano" })
  //     .then(console.log(puter.print));
  // };

  // const handleGptSearchClick = async () => {
  //   const query = searchText.current.value;
  //   if (!query) return;

  //   try {
  //     const response = await puter.ai.chat(
  //       `Act as a Movie Recommendation system and suggest some movies for the query :" + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, sholay, Don, Golmaal, Koi Mil Gaya for: ${query}`,
  //       { model: "gpt-5-nano" }
  //     );
  //     console.log("GPT Response:", response);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // Gemini Api Code
  // The client gets the API key from the environment variable `GEMINI_API_KEY`.

  // search movie in tmdb database
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = () => {
    const query = searchText.current.value;
    if (!query) {
      return;
    }
    const ai = new GoogleGenAI({ apiKey: OPEN_KEY });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a Movie Recommendation System.

Task:
- Given a user query: "${query}"
- If the query is a **movie name**, return that movie plus 6 **similar** movies.
- If the query is a **theme, genre, or description**, return 5 **recommended movies** matching it.

Output format:
- Only return movie names, comma-separated.
- Example output: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`,
      });

      if (!response) {
        // TODO: Write Error Handling here
      }

      // console.log(response.text);

      const gptMovies = response.text.split(",");

      // console.log(gptMovies);

      // For each movie I will search TMDB API

      // for this i will make a new function and execute it
      const promiseArray = gptMovies.map((movie) =>
        searchMovieTMDB(movie.trim()),
      );
      // i will get array of promises
      // [Promise, Promise, Promise, Promise, Promise]
      // console.log(promiseArray);
      // Promise.all
      const tmdbResults = await Promise.all(promiseArray);

      // console.log(tmdbResults);
      // let us push all these movies to our redux store

      // for this I basically have to dispatch an action
      dispatch(
        addGptMovie({ movieNames: gptMovies, movieResults: tmdbResults }),
      );
    }

    main();
  };

  return (
    <div className="md:pt-[8%] pt-[59%] flex justify-center">
      <form
        className=" bg-black md:w-[60%] w-[90%] grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 bg-white md:col-span-10 col-span-8"
        />
        <button
          className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg md:col-span-2 col-span-4"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
