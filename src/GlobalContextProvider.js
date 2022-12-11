import { createContext, useContext, useState } from "react";
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  var [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => {
          setTheme(theme === "light" ? "dark" : "light");
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
