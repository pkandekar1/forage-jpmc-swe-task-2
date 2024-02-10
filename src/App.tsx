import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data} />)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;  // Initialize a variable 'x' to 0

     // Set up an interval that runs every 100 milliseconds
    const interval = setInterval(() => {    
      // Call the getData method from DataStreamer to fetch data from the server
      // The method takes a callback function 'serverResponds' as an argument  
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
         // Update the component's state with the server's response data and set 'showGraph' to true
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      // Increment the 'x' variable
      x++;
      if(x>1000) {
        // If 'x' exceeds 1000, clear the interval to stop further execution
        clearInterval(interval);
      }
    },100); // Set the interval duration to 100 milliseconds

  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => { this.getDataFromServer() }}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
