import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const LandingPage = () => {
    const [isTouch, setIsTouch] = useState(false)
    const maxBlurRef = useRef(45)
    const thumbsCenterRef = useRef<Array<{ x: number; y: number }>>([])
    const maxDistanceRef = useRef(1000)

    const bluryfy = (elem: HTMLElement, volume: number, color: string) => {
        elem.style.textShadow = `${color} 0px 0px ${~~volume}px`
        elem.style.color = 'transparent'
    }

    const remap = (value: number, low1: number, high1: number, low2: number, high2: number) => {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
    }

    const calcDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
        const a = p2.x - p1.x
        const b = p2.y - p1.y
        return Math.sqrt(a * a + b * b)
    }

    const calcElemCenter = (elem: HTMLElement) => {
        const rect = elem.getBoundingClientRect()
        return {
            x: rect.x + (rect.width / 2),
            y: rect.y + (rect.height / 2),
        }
    }

    useEffect(() => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') return

        const deviceAgent = navigator.userAgent.toLowerCase()
        const isTouchDevice = (
            deviceAgent.match(/(iphone|ipod|ipad)/) ||
            deviceAgent.match(/(android)/) ||
            deviceAgent.match(/(iemobile)/) ||
            deviceAgent.match(/iphone/i) ||
            deviceAgent.match(/ipad/i) ||
            deviceAgent.match(/ipod/i) ||
            deviceAgent.match(/blackberry/i) ||
            deviceAgent.match(/bada/i) ||
            deviceAgent.match(/mobile/i)
        ) !== null

        setIsTouch(isTouchDevice)

        if (isTouchDevice) {
            maxBlurRef.current = 15
        }

        const thumbs = Array.from(document.querySelectorAll('.blur')) as HTMLElement[]
        const BODY_MARGIN = 50
        const MIN_BLUR = 0

        const updateThumbsCenter = () => {
            thumbsCenterRef.current = thumbs.map(calcElemCenter)
        }

        const updateMaxDistance = () => {
            maxDistanceRef.current = calcDistance(
                { x: BODY_MARGIN, y: BODY_MARGIN },
                { x: window.innerWidth, y: window.innerHeight }
            )
        }

        const updateThumbsBlur = (x: number, y: number) => {
            thumbs.forEach((thumb, i) => {
                const thumbCenter = thumbsCenterRef.current[i]
                const mouseCenter = { x, y }
                const dx = calcDistance(thumbCenter, mouseCenter)
                const blurVolume = remap(dx, 0, maxDistanceRef.current, MIN_BLUR, maxBlurRef.current)
                bluryfy(thumb, blurVolume, 'black')
            })
        }

        updateThumbsCenter()
        updateMaxDistance()

        if (!isTouchDevice) {
            const handleMouseMove = (e: MouseEvent) => {
                updateThumbsBlur(e.clientX, e.clientY)
            }
            window.addEventListener('mousemove', handleMouseMove)

            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
            }
        } else {
            thumbs.forEach((thumb) => {
                const link = thumb.querySelector('a') as HTMLAnchorElement
                let url = ''

                if (link) {
                    url = link.href
                    link.href = 'javascript:;'
                }

                const handleClick = (event: MouseEvent) => {
                    updateThumbsBlur(event.clientX, event.clientY)
                    
                    // Reset others
                    thumbs.forEach((_thumb) => {
                        if (_thumb !== thumb) {
                            _thumb.classList.remove('clicked')
                        }
                    })

                    if (thumb.classList.contains('clicked')) {
                        if (url) {
                            window.location.href = url
                        }
                    } else {
                        thumb.classList.add('clicked')
                    }
                }

                thumb.addEventListener('click', handleClick)
            })

            const handleResize = () => {
                updateThumbsCenter()
                updateMaxDistance()
            }

            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    return (
        <>
            <Head>
                <title>I love building stuff!</title>
                <meta name="keywords" content="amir houieh, SUSLIB, Unbody, HIRO, creative technologies, design and technology, design technologist, creative design and technology, design and technology, design, technology,experimental publishing, digital publishing, generative design, amirhouieh" />
                <meta name="description" content="Creative technologist" />
                <meta name="copyright" content="amir.cloud" />
                <meta name="language" content="EN" />
                <meta name="Classification" content="Design/Programming" />
                <meta name="author" content="Amir, amir.houieh@gmail.com" />
                <meta name="designer" content="amir houieh" />
                <meta name="owner" content="amir houieh" />
                <meta name="url" content="https://amir.cloud" />
                <meta name="identifier-URL" content="https://amir.cloud" />
                <meta property="og:title" content="Amir Houieh" />
                <meta property="og:url" content="https://amir.cloud" />
                <meta property="og:image" content="https://amir.cloud/amir-houieh.jpg" />
                <meta property="og:site_name" content="amir houieh" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="I'm Amir and I love building stuff!" />
                <meta name="twitter:image" content="https://amir.cloud/amir-houieh.jpg" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "http://schema.org/",
                            "@type": "WebSite",
                            "accountablePerson": {
                                "@context": "http://schema.org",
                                "@type": "Person",
                                "email": "amir.houieh@gmail.com",
                                "image": "https://yt3.ggpht.com/a-/ACSszfEJ9AQACF5UyZAQLNf7l6u5flKWpvt-0LdOnA=s900-mo-c-c0xffffffff-rj-k-no",
                                "jobTitle": "Indie software maker",
                                "name": "Amir Houieh",
                                "url": "https://amir.cloud",
                                "alumniOf": "Royal Academy of Art, The Hague",
                                "owns": ["xtxt", "SUSLIB", "Unbody", "Hiro"],
                                "sameAs": [
                                    "https://www.linkedin.com/in/amirhouieh",
                                    "https://github.com/amirhouieh",
                                    "https://vimeo.com/user13046302",
                                    "https://twitter.com/amirhouieh"
                                ],
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Den Haag, The Netherlands"
                                }
                            },
                            "alternativeHeadline": "I love building stuff",
                            "keywords": "amir houieh, SUSLIB, creative technologies, Unbody, Hiro, design and technology, design technologist, creative design and technology, design and technology, design, technology,experimental publishing, digital publishing, generative design",
                            "thumbnailUrl": "https://amir.cloud/amir-houieh.jpg"
                        })
                    }}
                />
            </Head>

            <style jsx>{`
                * {
                    padding: 0;
                    margin: 0;
                }

                img {
                    width: 100%;
                }

                a, a:visited, a:active {
                    text-decoration: underline;
                    color: black;
                }

                h1, h2, h3, h4 {
                    font-weight: normal;
                }

                h2 {
                    font-size: 50px;
                    text-transform: uppercase;
                }

                small, code {
                    font-size: 10px;
                    font-family: monospace;
                }

                .blur, .blur * {
                    color: transparent;
                }

                .blur {
                    text-shadow: black 0 0 25px;
                }

                .index-item {
                    width: 300px;
                }

                p {
                    font-family: Arial, sans-serif;
                }

                .index-item + .index-item {
                    margin-top: 1em;
                }

                @media only screen and (max-width: 600px) {
                    h1 {
                        font-size: 36px;
                    }
                }

                @media (hover: none) {
                    .blur {
                        text-shadow: black 0 0 15px;
                    }
                }
            `}</style>

            <h2 className="blur">
                <Link href="/">
                    /<h1 style={{ display: 'none' }}>Amir Houieh</h1>
                </Link>
            </h2>
            <br />
            <br />
            <p style={{ maxWidth: '800px' }}>
                I'm a founder and AI product leader focused on building truly AI-native products. I lead teams to take complex ideas from initial vision and R&D to successful go-to-market execution.
                <br /><br />
                I founded <a href="https://unbody.io" title="Unbody" target="_blank">Unbody</a>, where I scaled an AI backend-as-a-service to a 5,000+ developer community and $100k+ ARR. Before that, I co-founded <a href="https://suslib.com" title="SUSLIB" target="_blank">SUSLIB</a> in 2018, directing early-stage R&D into new forms of human-AI interaction long before the current hype cycle.
                <br /><br />
                My core conviction is that the future of software requires questioning old assumptions, not just bolting AI onto existing products. I thrive on closing the gap between raw technical capability and products that solve real, human problems.
            </p>
            <br />
            <br />
            <div className="index-item blur">
                <Link href="/projects">
                    <h2>Projects</h2>
                </Link>
                <small>
                    <p>Projects, lectures and workshops.</p>
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
                <br />
                <br />
                <span>Archived projects and works 📁🧑‍🎨</span>
                <br />
                <a href="https://archive.amir.cloud">
                    <small>Visual Pollution</small>
                </a>
            </div>
        </>
    )
}

export default LandingPage
