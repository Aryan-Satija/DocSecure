import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup, Validate, Create, Dashboard } from './pages';
function App() {
  return (
    <div >
      <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/validate" element={<Validate/>}/>
        <Route exact path="/create" element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
