import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import { auth, provider } from "./firebase";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Details";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "./features/user/userSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(()=>{
    auth.onAuthStateChanged(async(user)=>{
      if(user){
        setUser(user);
        history.push('/home')
      }
    })
  },[userName]);
  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <div className="App">
      <Router>
        <Header handleAuth={handleAuth} />
        <Switch>
          <Route exact path="/">
            <Login handleAuth={handleAuth}/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path='/detail/:id'>
            <Detail/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
