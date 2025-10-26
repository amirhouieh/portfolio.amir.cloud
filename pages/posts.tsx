import React from 'react'
import { GetStaticProps } from 'next'
import { readFileSync } from 'fs'
import Link from 'next/link'
import { Header } from '../src/components/header'
import { BlurText } from '../src/components/blur-text'
import { Seo } from '../src/components/seo'

interface Post {
    title: string
    type: string
    date: string
    url: string
    description: string
    image?: string
}

interface Props {
    posts: Post[]
}

class Posts extends React.Component<Props> {
    render() {
        const { posts } = this.props

        return (
            <div>
                <Header currentPage="home" />
                <br/>
                <br/>
                
                <div className="container">
                    <Seo title="Posts by Amir Houieh" description="Blog posts and writings" />
                    
                    <div className="posts-list">
                        {posts.map((post, i) => {
                            const isNarrow = typeof window !== 'undefined' && (window.innerWidth <= 800 || ('ontouchstart' in window || navigator.maxTouchPoints > 0));
                            const maxBlur = isNarrow ? 2 : 15;
                            
                            return (
                                <div key={i} className="post-item">
                                    <BlurText fontSize={24} maxVolume={maxBlur} distanceSensitivity={0.5}>
                                        <a href={post.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                            <h2 style={{ fontSize: '20px', textTransform: 'none' }}>{post.title}</h2>
                                        </a>
                                        <code style={{ fontSize: '10px', display: 'block', marginTop: '5px' }}>{post.date}</code>
                                    </BlurText>
                                    {post.image && (
                                        <div style={{ marginTop: '15px', marginBottom: '10px' }}>
                                            <a href={post.url} target="_blank" rel="noopener noreferrer">
                                                <img src={post.image} alt={post.title} style={{ maxWidth: '100%', height: 'auto' }} />
                                            </a>
                                        </div>
                                    )}
                                    {post.description && (
                                        <div className="post-description" style={{
                                            fontSize: "13px",
                                            marginTop: "10px",
                                            lineHeight: "1.4",
                                            fontFamily: "sans-serif"
                                        }}>
                                            {post.description}
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
    const postsPath = 'public/posts.json'
    const posts = JSON.parse(readFileSync(postsPath, 'utf8'))
    
    return {
        props: {
            posts
        }
    }
}

export default Posts

