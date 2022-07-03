import { Provider } from "react-redux";
import { store } from "./Screens/redux/store";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Main from "./components/Main";
export default function App() {
  const [iasReady, setIasReady] = useState(false);
  const loadApplication = async () => {
    await Font.loadAsync({
      "DMMono-Regular": require("./assets/fonts/DMMono-Regular.ttf"),
    });
  };

  if (iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <Provider store={store}>
        <Main></Main>
      </Provider>
    </>
  );
}
