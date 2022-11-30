import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {StageProvider} from "./context/StageContext";
import {Navigation} from "./components/Navigation";
import {TaskListProvider} from "./context/TaskListContext";
import {AuthProvider} from "./context/AuthContext";

const App = () => {

  return (
      <div>
            <BrowserRouter>
              <AuthProvider>
                  <StageProvider>
                      <TaskListProvider>
                          <Navigation/>
                      </TaskListProvider>
                  </StageProvider>
              </AuthProvider>
            </BrowserRouter>
      </div>
  );
}

export default App;
