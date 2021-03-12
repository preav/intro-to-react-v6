import { StrictMode, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Details from "./Details";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext"; //context solves the problem of prop drilling

// const Details = lazy(() => import("./Details"));
// const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const theme = useState("black"); // this is a hook
  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
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
      </ThemeContext.Provider>
    </StrictMode>
  );
};

// ReactDOM.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
//   document.getElementById("root")
// );

export default App;
