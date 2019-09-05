import React from 'react';
import './App.css';

class App extends React.Component {
  
  nowState = {
     data: undefined,
  }

  render() {
    return (
      <div className="App">
        <header className = "App-header">
            <h1>Smart Traffic Light</h1>
            <label htmlFor= "start">Start Simulation </label>
            
              <input type="button"
                  onClick={this.startSimulation}
                  value={'Start'}/>
              
              <label htmlFor= "stop">Stop Simulation </label>
                  <input type="button"
                  onClick={this.stopSimulation}
                  value={'Stop'}/>
              
              <label htmlFor= "state">Current State</label>
                  <input type="button"
                  onClick={this.currentState}
                  value={'State'}/>
        </header>
       <div className= "App-content">
            <p>{this.nowState.text}</p>
            
            </div>
            

        </div>
    )
  }
  startSimulation = () =>
  {
    console.log('button working')
    fetch('http://localhost:3005/start')
  }
  stopSimulation = () =>
  {
    console.log('button working')
    fetch('http://localhost:3005/stop')
  }
  currentState = () =>
  {
    fetch('http://localhost:3005/state')
      .then(response => response.json())
        .then(data => {
          this.setState({ 
             text: data
        })
      }  
      )
}

}

export default App;