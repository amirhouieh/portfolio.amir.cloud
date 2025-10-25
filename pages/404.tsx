import React from 'react'
import Link from 'next/link'
import { BlurText } from "../src/components/blur-text"

const Custom404: React.FC = () => {
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
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link href="/">
                    <a>Go back home</a>
                </Link>
            </div>
        </div>
    )
}

export default Custom404
