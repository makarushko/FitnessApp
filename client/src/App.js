import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Singup';
import Login from './components/Login';
import ExerciseDetail from "./components/ExerciseDetail";
import {Box} from "@mui/material";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

const user = localStorage.getItem('token');
const App = () => (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      {user && <Navbar user={user} />}
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        {user && <Route path="/exercise/:id" element={<ExerciseDetail />} />}
        {user && <Route path="/profile" element={<Profile user={user} />} />}
      </Routes>
      <Footer />
    </Box>
);

export default App;
