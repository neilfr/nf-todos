import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {StageProvider} from "./context/StageContext";
import {Navigation} from "./components/Navigation";
import {TaskListProvider} from "./context/TaskListContext";
import {AuthProvider} from "./context/AuthContext";
import {ApiProvider} from "./context/ApiContext";

const App = () => {

  return (
      <div>
          <ApiProvider>
            <BrowserRouter>
              <AuthProvider>
                  <StageProvider>
                      <TaskListProvider>
                          <Navigation/>
                      </TaskListProvider>
                  </StageProvider>
              </AuthProvider>
            </BrowserRouter>
          </ApiProvider>
      </div>
  );
}

export default App;
