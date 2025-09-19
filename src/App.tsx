import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
