// import nextfly from "../assets/nextfly.svg";
import netflix from "../assets/Netflix_Logo.png";
import signOutLogo from "../assets/sign_out.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const { pathname } = useLocation();
  // console.log(pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // if the user signs out, I want to navigate to the home page
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
        navigate("/error");
      });
  };

  // adding the useEffect Hook inside the Header component
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        // here i will update my redux store
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        if (pathname == "/") {
          navigate("/browse");
        }
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when the component unmounts
    return () => {
      // when my header component unloads, it will basically unsubscribe to this onAuthStateChanged event
      unsubscribe();
    };
  }, []);

  // const handleGptSearchClick = () => {
  //   // Toggle GPT Search button
  //   // we'll also store that information inside the redux store
  //   // for toggling this button we have to dispatch an action
  //   dispatch(toggleGptSearchView());
  // };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  // ✅ Hide header on all routes except '/', '/tvShow', '/indianMovies'
  if (
    pathname !== "/browse" &&
    pathname !== "/tvShow" &&
    pathname !== "/indianMovies"&&
    pathname !== "/gptSearch"
  ) {
    return null;
  }
  return (
    <div className="absolute w-screen px-8 md:py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      <img src={netflix} className="w-30 md:w-44" alt="logo" />
      {user && (
        <div className="flex flex-col md:flex-row p-2 gap-1 md:gap-2 items-center">
          <ul className="text-white flex gap-4 md:mr-[700px] cursor-pointer items-center">
            <li>
              <Link to="/browse">Home</Link>
            </li>
            <li>
              <Link to="/tvShow">
                TV<span>Shows</span>
              </Link>
            </li>
            <li>
              <Link to="/indianMovies">
                Indian<span>Movies</span>
              </Link>
            </li>
          </ul>
          {pathname === "/gptSearch" && (
            <select
              className="p-2 m-2 bg-gray-900 text-white border-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button className="py-2 px-4 mx-4 bg-purple-800 text-white rounded-lg">
            <Link to="/gptSearch">
              GPT<span>Search</span>
            </Link>
          </button>

          <img
            src={signOutLogo}
            className="w-12 h-12 rounded-lg hidden md:block"
            alt="sign out"
          />
          <button
            className="cursor-pointer font-bold text-lg text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
