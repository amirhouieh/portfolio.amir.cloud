import React from "react"
import Link from "next/link"
import { BlurText } from "./blur-text"

interface Props {
    currentPage?: 'home' | 'projects' | 'project'
}

export const Header: React.FC<Props> = ({ currentPage = 'home' }) => {
    return (
        <BlurText fontSize={36} color={"blue"} maxVolume={6}>
            <Link href="/">
                <h2 className="page-info">/</h2>
            </Link>
            <a title={"about me"} href={"https://amir.cloud"}>
                <small>Amir Gorbani Houieh</small>
            </a>
            {(currentPage === 'projects' || currentPage === 'project') && (
                <>
                    <br />
                    <Link href="/projects">
                        <small>Projects</small>
                    </Link>
                </>
            )}
        </BlurText>
    )
}

