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
            {currentPage === 'projects' && (
                <Link href="/projects">
                    <small>Projects</small>
                </Link>
            )}
            {currentPage === 'project' && (
                <Link href="/projects">
                    <small>Projects</small>
                </Link>
            )}
        </BlurText>
    )
}

