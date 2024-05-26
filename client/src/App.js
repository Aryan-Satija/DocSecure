import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Profile, Signup, Validate, Create, Dashboard, Home, ContactUs, About } from './pages';
import PrivateRoute from './components/privateRoute';
function App() {
  return (
    <div>
      <div className='bg-[#121316]'>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}>
              <Route exact path="/validate" element={<PrivateRoute><Validate/></PrivateRoute>}/>
              <Route exact path="/create" element={<PrivateRoute><Create/></PrivateRoute>}/>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/contact" element={<ContactUs/>}/>
              <Route exact path="/profile" element={<Profile/>}/>
          </Route>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
