import { useEffect, useState } from 'react';
import './App.css';
import Signup from './components/Signup';
import { auth } from './config/firebase';

function App() {
  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
