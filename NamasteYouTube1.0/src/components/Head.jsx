import ham from "../assets/hamburger.webp";
import youtube from "../assets/youtubeLogo.jpg";
import userIcon from "../assets/usericon.png";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";

function Head() {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col shadow p-5 h-20">
      <div className="flex items-center col-span-1">
        <img
          alt="menu"
          src={ham}
          className="h-12 -mt-9 mx-2 cursor-pointer"
          onClick={() => toggleMenuHandler()}
        />
        <img
          alt="youtube"
          src={youtube}
          className="h-30 -mt-9 cursor-pointer"
        />
      </div>
      {/* Search Bar Input Box */}
      <div className="col-span-10 px-10">
        <input
          className="w-1/2 border border-gray-950 p-2 rounded-l-full"
          type="text"
        />
        <button className="border border-gray-950 p-2 rounded-r-full px-5 py-2 bg-gray-100 cursor-pointer">
          🔎
        </button>
      </div>
      {/* User Icon */}
      <div className="col-span-1">
        <img src={userIcon} alt="user" className="h-8" />
      </div>
    </div>
  );
}

export default Head;
