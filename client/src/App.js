import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup, Validate, Create, Dashboard, Home } from './pages';
import { Navbar } from './components/navbar';
function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}>
              <Route exact path="/validate" element={<Validate/>}/>
              <Route exact path="/create" element={<Create/>}/>
              <Route exact path="/home" element={<Home/>}/>
          </Route>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
