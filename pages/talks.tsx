import React from 'react'
import { GetStaticProps } from 'next'
import { readFileSync } from 'fs'
import Link from 'next/link'
import ReactPlayer from 'react-player'
import { Header } from '../src/components/header'
import { BlurText } from '../src/components/blur-text'
import { Seo } from '../src/components/seo'

interface Talk {
    title: string
    type: string
    date: string
    url: string
    description: string
}

interface Props {
    talks: Talk[]
}

class Talks extends React.Component<Props> {
    render() {
        const { talks } = this.props

        return (
            <div>
                <Header currentPage="home" />
                <br/>
                <br/>
                
                <div className="container">
                    <Seo title="Talks by Amir Houieh" description="Conference talks and presentations" />
                    
                    <div className="talks-list">
                        {talks.map((talk, i) => {
                            const isNarrow = typeof window !== 'undefined' && (window.innerWidth <= 800 || ('ontouchstart' in window || navigator.maxTouchPoints > 0));
                            const maxBlur = isNarrow ? 2 : 15;
                            
                            return (
                                <div key={i} className="talk-item">
                                    <BlurText fontSize={24} maxVolume={maxBlur} distanceSensitivity={0.5}>
                                        <a href={talk.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                            <h2 style={{ fontSize: '20px', textTransform: 'none' }}>{talk.title}</h2>
                                        </a>
                                        <code style={{ fontSize: '10px', display: 'block', marginTop: '5px' }}>{talk.date}</code>
                                    </BlurText>
                                    {talk.url && (
                                        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                                            <ReactPlayer 
                                                url={talk.url}
                                                width="100%"
                                                height="400px"
                                                controls={true}
                                            />
                                        </div>
                                    )}
                                    {talk.description && (
                                        <div className="talk-description" style={{
                                            fontSize: "13px",
                                            marginTop: "10px",
                                            lineHeight: "1.4",
                                            fontFamily: "sans-serif"
                                        }}>
                                            {talk.description}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export const getStaticProps: GetStaticProps = async () => {
    const talksPath = 'public/talks.json'
    const talks = JSON.parse(readFileSync(talksPath, 'utf8'))
    
    return {
        props: {
            talks
        }
    }
}

export default Talks

