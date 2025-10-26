import React from 'react'
import Link from 'next/link'
import { BlurText } from './blur-text'

interface HeaderProps {
    currentPage?: 'home' | 'projects' | 'project'
    projectName?: string
}

export const Header: React.FC<HeaderProps> = ({ currentPage = 'home', projectName }) => {
    const isNarrow = typeof window !== 'undefined' && (window.innerWidth <= 800 || ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    const maxBlur = isNarrow ? 2 : 6;
    
    return (
        <BlurText fontSize={14} maxVolume={maxBlur}>
            <h2 className="page-info" style={{ fontSize: '14px' }}>
                <Link href="/" title="Home" style={{ textDecoration: 'none'}}>
                    /
                </Link>
                {' '}
                <Link href="/" title="Amir Gorbani Houieh" style={{ textDecoration: 'none'}}>
                    Amir Gorbani Houieh
                </Link>
                
                {currentPage === 'projects' && (
                    <>
                        {' / '}
                        <Link href="/projects" title="Projects" style={{ textDecoration: 'none'}}>
                            Projects
                        </Link>
                    </>
                )}
                
                {currentPage === 'project' && projectName && (
                    <>
                        {' / '}
                        <Link href="/projects" title="Projects" style={{ textDecoration: 'none'}}>
                            Projects
                        </Link>
                        {' / '}
                        <span>{projectName}</span>
                    </>
                )}
            </h2>
        </BlurText>
    )
}

