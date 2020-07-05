import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { MainView } from './components/main-view/main-view';
import moviesApp from './reducers/reducers'; // Imports the reducer ( state + action = new state )

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp); // Store created in the topmost file of the application -> passed to all other views + components

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      // Wraps the entire app in a provider -> store is accessible from the entire app
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);