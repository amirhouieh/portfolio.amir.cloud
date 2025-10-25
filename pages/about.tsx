import React from 'react'
import Link from 'next/link'
import { BlurText } from "../src/components/blur-text"

const About: React.FC = () => {
    return (
        <div>
            <BlurText fontSize={50} color={"blue"} maxVolume={10}>
                <Link href="/">
                    <h2 className="page-info">/</h2>
                </Link>
                <a title={"about me"} href={"https://amir.cloud"}>
                    <small>amir houieh</small>
                </a>
            </BlurText>
            <br/>
            <br/>
            <br/>
            
            <div className="container">
                <h1>About</h1>
                <p>This page is under construction.</p>
            </div>
        </div>
    )
}

export default About
