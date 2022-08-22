import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";

import Header from "./components/Header";
import LoginForm from "./components/user/LoginForm";
import Network from "./components/user/Network";
import RegisterForm from "./components/user/RegisterForm";
import Portfolio from "./components/Portfolio";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/users/:userId" element={<Portfolio />} />
                <Route path="/network" element={<Network />} />
                <Route path="*" element={<Portfolio />} />
            </Routes>
        </Router>
    );
}

export default App;
