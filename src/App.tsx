import React from "react"
import {Link, Router} from "react-static"
import {hot} from "react-hot-loader"

import Routes from "react-static-routes"

import "./base.css";
import "./app.css";
import {BlurText} from "./components/blur-text";

const App = () => (
    <Router>
        <div>
            <BlurText fontSize={50} color={"blue"} maxVolume={10}>
                <Link to={`/`}>
                    <h2 className="page-info">/</h2>
                </Link>
                <a title={"about me"} href={"https://amir.cloud"}>
                    <small>amir houieh</small>
                </a>
            </BlurText>
            <br/>
            <br/>
            <br/>
            <Routes/>
        </div>
    </Router>
)


export default hot(module)(App)
