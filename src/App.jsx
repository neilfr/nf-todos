import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {StageProvider} from "./context/StageContext";
import {Navigation} from "./components/Navigation";
import {TaskListProvider} from "./context/TaskListContext";

const App = () => {

  return (
      <div>
          <BrowserRouter>
              <StageProvider>
                  <TaskListProvider>
                      <Navigation/>
                  </TaskListProvider>
              </StageProvider>
          </BrowserRouter>
      </div>
  );
}

export default App;
