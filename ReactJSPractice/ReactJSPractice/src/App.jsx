import EvenOrOddChecker from "./components/EvenOrOddChecker";
import GuessTheNumber from "./components/GuessTheNumber";
import LeapYear from "./components/LeapYear";
import MortageCalculator from "./components/MortageCalculator";
import { NamedExport } from "./components/ImportExport";
import DefaultExport from "./components/ImportExport";
import Counter from "./components/Counter";
import TogglePassword from "./components/TogglePassword";
import UpdatingStateUsingCallBack from "./components/useStateHookRevision/UpdatingStateUsingCallBack";
import UpdatingStateHavingMultipleCallBacks from "./components/useStateHookRevision/UpdatingStateHavingMultipleCallBacks";
import PlayingWithSetState01 from "./components/useStateHookRevision/PlayingWithSetState01";
import PlayingWithSetState02 from "./components/useStateHookRevision/PlayingWithSetState02";
import PlayingWithUseEffectHook from "./components/useStateHookRevision/PlayingWithUseEffectHook";

// import ContextProvider from "./components/ContextRevisionInReact/ContextProvider";
import ContextParent from "./components/ContextRevisionInReact/ContextParent";
// import Context from "./components/ContextHookAuthentication/Context";
import Parent from "./components/ContextHookPracticeByFollowing/Parent";
import ContextExample from "./components/ContextHookPracticeByFollowing/ContextExample";

const App = () => {
  return (
    // <>
    //   <NamedExport />
    //   <DefaultExport />
    // </>
    // <Counter />
    // <UpdatingStateHavingMultipleCallBacks />
    // <PlayingWithSetState01 />
    // <PlayingWithSetState02 />
    // <PlayingWithUseEffectHook />
    // <PlayingWithUseEffectHook />
    // <ContextProvider>
    //   <ContextParent />
    // </ContextProvider>
    // <Context />
    //?<Parent /> here is a children Props
    <ContextExample>
      <Parent />
    </ContextExample>
  );
};

export default App;
