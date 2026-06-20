import Header from "./Header";
import banner4 from "../assets/banner4.jpg";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // using useRef() hook
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data

    // console.log(email.current.value);
    // console.log(password.current.value);
    // email.current.value is basically coming from the useRef Hook

    const message = checkValidData(
      email.current.value,
      password.current.value
      // name.current.value
    );

    // console.log(message);
    setErrorMessage(message);

    if (message) return;

    // Sign / Sign Up the user
    // here i will write the Sign In Sign Up Logic
    // first of all I need to check that weather this form is a sign in form or a sign up form
    if (!isSignInForm) {
      // Sign Up Logic
      // code written from the firebase docs
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // once the user account is being created we'll now update the user's profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0oLOZsLCkpSyVlvkj5PGHmSQSugm-rPndHQ&s",
          })
            .then(() => {
              // Profile updated!
              // when my profile is updated then navigate
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // here i will update my redux store
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          // if my response is successful, then firebase will give me a user object
          // console.log(user);
          // from here i can push this user information to my redux store
          // let me navigate from here
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // let us also show the error message
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={banner4} className="h-screen w-screen object-cover" alt="NextFlyNova" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 w-full md:w-3/12  bg-black absolute my-20 mx-auto right-0 left-0 text-white rounded-lg opacity-85"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 bg-gray-700 w-full"
        />
        {/* Error field */}
        <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full text-white rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to NextFlyNova? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
