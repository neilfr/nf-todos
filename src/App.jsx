import React, {useReducer} from 'react';
import './App.css';
import Base from "./layouts/Base";

const reducer = ( state, action ) => {
  switch (action.type) {
    case 'increment':
      return {...state, 'count': state.count + 1}
      break;
    case 'decrement':
      return {...state, 'count': state.count - 1}
      break;
    case 'changeother':
      return {...state, 'otherthing': 'foobar'}
      break;
    default:
      return {...state}
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, {count: 0, otherthing: 'other'})

  return (
      <div>
        <div>count: {state.count}</div>
        <div>otherthing: {state.otherthing}</div>
        <button onClick = {()=>dispatch({ type:'increment' })}>Increment</button>
        <button onClick = {()=>dispatch({ type:'decrement' })}>Decrement</button>
        <button onClick = {()=>dispatch({type:'changeother'})}>other</button>
        <Base/>
      </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
