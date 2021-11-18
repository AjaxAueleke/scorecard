import "./App.css";
import Card from "./component/Card";
import CardInput from "./component/CardInput";
import NavBar from "./component/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <NavBar heading="Live Score!" />
        <Switch>
          <Route path="/input">
            <CardInput />
          </Route>
          <Route exact path="/">
            <Card />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
