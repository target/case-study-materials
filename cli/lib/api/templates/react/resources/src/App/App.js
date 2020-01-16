import React, { useEffect, useState } from "react";
import './App.css'

const VERSION_API_URL = 'http://localhost:8001/version_api/';

function App() {

  const [version, setVersion] = useState('');

  useEffect(() => {
    fetch(VERSION_API_URL)
      .then(res => res.json())
      .then((data) => {
        setVersion(data.version)
      });
  }, []);

  return (
    <div className="app">
      <h1>Hello World</h1>
      <h2>{version}</h2>
    </div>
  );
}

export default App
