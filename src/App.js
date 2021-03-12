import { StrictMode, useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
// import SearchParams from "./SearchParams";
// import Details from "./Details";
import ThemeContext from "./ThemeContext"; //context solves the problem of prop drilling

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
  const theme = useState("black"); // this is a hook
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Suspense fallback={<h1> loading route...</h1>}>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
