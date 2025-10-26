import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Header } from '../src/components/header'
import { BlurText } from '../src/components/blur-text'

export default function Home() {
    const isNarrow = typeof window !== 'undefined' && (window.innerWidth <= 800 || ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    const projectsMaxBlur = isNarrow ? 2 : 10;
    
    return (
        <>
            <Head>
                <title>Amir Houieh - Founder & Engineer</title>
                <meta name="keywords" content="amir houieh, AI, machine learning, adaptive systems, memory, generative intelligence, Unbody, SUSLIB, RAG, AI-native development, founder, engineer, HCI, smart environments" />
                <meta name="description" content="Founder and engineer working on adaptive systems, memory, and generative intelligence. Founded Suslib (R&D lab) and Unbody (AI-native development stack)." />
                <meta name="copyright" content="amir.cloud" />
                <meta name="language" content="EN" />
                <meta name="Classification" content="AI/Engineering/Product" />
                <meta name="author" content="Amir Houieh, amir.houieh@gmail.com" />
                <meta name="designer" content="amir houieh" />
                <meta name="owner" content="amir houieh" />
                <meta name="url" content="https://amir.cloud" />
                <meta name="identifier-URL" content="https://amir.cloud" />
                <meta property="og:title" content="Amir Houieh - Founder & Engineer" />
                <meta property="og:url" content="https://amir.cloud" />
                <meta property="og:image" content="https://amir.cloud/amir-houieh.jpg" />
                <meta property="og:site_name" content="amir houieh" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Founder and engineer working on adaptive systems, memory, and generative intelligence. Founded Suslib and Unbody." />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Amir Houieh - Founder & Engineer" />
                <meta name="twitter:description" content="Founder and engineer working on adaptive systems, memory, and generative intelligence." />
                <meta name="twitter:image" content="https://amir.cloud/amir-houieh.jpg" />
                
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org/",
                        "@type": "WebSite",
                        "accountablePerson": {
                            "@context": "http://schema.org",
                            "@type": "Person",
                            "email": "amir.houieh@gmail.com",
                            "image": "https://amir.cloud/amir-houieh.jpg",
                            "jobTitle": "Founder & Engineer - AI Systems",
                            "name": "Amir Gorbani Houieh",
                            "url": "https://amir.cloud",
                            "alumniOf": "Royal Academy of Art, The Hague",
                            "description": "Founder and engineer working on adaptive systems, memory, and generative intelligence",
                            "founder": [
                                {
                                    "@type": "Organization",
                                    "name": "Unbody",
                                    "url": "https://unbody.io",
                                    "description": "Open-source and SaaS stack for AI-native development covering RAG, memory, and tool calling"
                                },
                                {
                                    "@type": "Organization",
                                    "name": "SUSLIB",
                                    "url": "https://suslib.com",
                                    "description": "R&D lab blending ML, HCI, and smart environments"
                                }
                            ],
                            "sameAs": [
                                "https://www.linkedin.com/in/amirhouieh",
                                "https://github.com/amirhouieh",
                                "https://twitter.com/amirhouieh",
                                "https://mastodon.social/@imamir"
                            ],
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Den Haag, The Netherlands"
                            }
                        },
                        "name": "Amir Houieh",
                        "alternateName": "Amir Gorbani Houieh",
                        "description": "Founder and engineer working on adaptive systems, memory, and generative intelligence. Founded Suslib and Unbody.",
                        "keywords": "amir houieh, AI, machine learning, adaptive systems, memory, generative intelligence, Unbody, SUSLIB, RAG, AI-native development, founder, engineer",
                        "thumbnailUrl": "https://amir.cloud/amir-houieh.jpg"
                    })
                }} />
            </Head>

            <div className="landing-page">
                <Header currentPage="home" />
                <br />
                <br />
                <p style={{ maxWidth: '800px' }}>
                    I'm a founder and engineer working on adaptive systems, memory, and generative intelligence — basically making AI less artificial.
                    <br /><br />
                    I founded <a href="https://suslib.com" title="SUSLIB" target="_blank" rel="noopener noreferrer">Suslib</a> in 2018, an R&D lab blending ML, HCI, and smart environments, and now <a href="https://unbody.io" title="Unbody" target="_blank" rel="noopener noreferrer">Unbody</a>, an open-source and SaaS stack for AI-native development — covering RAG, memory, and tool calling.
                </p>
                <br />
                <br />
                <div className="index-item">
                    <BlurText fontSize={28} maxVolume={projectsMaxBlur}>
                        <Link href="/projects" style={{ textDecoration: 'none' }}>
                            <h2 style={{ fontSize: '28px' }}>Projects</h2>
                        </Link>
                    </BlurText>
                    <small>
                        <p>
                            Projects, lectures and workshops.
                        </p>
                    </small>
                </div>
                <br />
                <br />
                <div className="">
                    <span>Get in touch 🤗</span>
                    <br />
                    <small>amir.houieh@gmail.com</small>
                    <br />
                    <a href="https://github.com/amirhouieh/"><small>Github</small></a>
                    <br />
                    <a href="https://twitter.com/amirhouieh"><small>Twitter</small></a>
                    <br />
                    <a href="https://www.linkedin.com/in/amirhouieh/"><small>Linkedin</small></a>
                    <br />
                    <a rel="me" href="https://mastodon.social/@imamir"><small>Mastodon</small></a>
                </div>
            </div>

            <style jsx global>{`
                .index-item {
                    width: 300px;
                }

                .index-item + .index-item {
                    margin-top: 1em;
                }
            `}</style>
        </>
    )
}
