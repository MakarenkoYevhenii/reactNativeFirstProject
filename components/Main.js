import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthStateChangeUser } from "../Screens/redux/auth/authOperation";
import { useEffect, useState } from "react";

const main = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const { stateChange } = useSelector((state) => state.auth);
    console.log(stateChange);
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  useEffect(() => {
    dispatch(AuthStateChangeUser());
  }, []);
  const state = useSelector((state) => state);

  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default main;
