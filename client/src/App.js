import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup, Validate, Create, Dashboard, Home, ContactUs } from './pages';
import PrivateRoute from './components/privateRoute';
function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}>
              <Route exact path="/validate" element={<PrivateRoute><Validate/></PrivateRoute>}/>
              <Route exact path="/create" element={<PrivateRoute><Create/></PrivateRoute>}/>
              <Route exact path="/home" element={<Home/>}/>
              <Route exact path="/contact" element={<ContactUs/>}/>
          </Route>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
