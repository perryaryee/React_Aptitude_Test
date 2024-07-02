import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from "./Pages/Signup";
import Header from './Compnoents/Header';
import Home from "./Pages/Home";
import Footer from './Compnoents/Footer';
import ArticleFavourites from "./Pages/ArticleFavourites";
import NewArticle from './Pages/NewArticle';
import Setting from "./Pages/Settings";
import Profile from './Pages/Profile';
import { useSelector } from 'react-redux';
import { selectUserToken, selectUsername } from './Redux/Slice/UserSlice';
import Article from './Pages/Article';
import EditArticle from './Pages/EditArticle';


function App() {
  const isLoggedIn = useSelector(selectUserToken);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/edit-article/:slug' element={isLoggedIn ? <EditArticle /> : <Navigate to="/login" />} />
        <Route path='/article/:slug' element={isLoggedIn ? <Article /> : <Navigate to="/login" />} />
        <Route path='/new-article' element={isLoggedIn ? <NewArticle /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLoggedIn ? <Setting /> : <Navigate to="/login" />} />
        <Route path='/profile/:username' element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path='/articles/:slug/favorite' element={isLoggedIn ? <ArticleFavourites /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
