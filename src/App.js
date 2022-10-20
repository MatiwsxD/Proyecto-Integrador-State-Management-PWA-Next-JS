import React from "react";
//import "./App.css";
import Login from "./login";
import Tasks from "./Tasks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import themeReducer from utils
import initialState from utils

const [state, dispatch] = useReducer(themeReducer, initialState);
function App() {
  
  return (
    <ThemeContext.Provider  value={{ state, dispatch }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
    <button onClick={() => {
	  if (state.isDarkMode) {
		  dispatch("SET_LIGHT_MODE");
	    } else {
		    dispatch("SET_DARK_MODE");
	      }
      }}> 
      <div className={`-${state.isDarkMode ? "dark" : "light"}`} 
      ></div>

    </button>

    </ThemeContext.Provider>



  );
}

export default App;