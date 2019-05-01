import React from 'react';
import './App.css';
import { MapComponent } from './Map';
import { RenderLogic } from './RenderLogic';

function App() {

  const child = <MapComponent />;

  return (
    <div className="App">
      <header className="App-header">
        <RenderLogic children={ child } />
      </header>
    </div>
  );
}

export default App;
