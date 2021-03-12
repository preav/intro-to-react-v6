import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]); // we're passing hooks inside this context and second param is because hooks expect a function as its second param

export default ThemeContext;