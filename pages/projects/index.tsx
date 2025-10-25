import React from "react"
import { GetStaticProps } from 'next'
import { readFileSync } from 'fs'
import { Page, Image } from "../../data-module/lib/types"
import Nav from "../../src/components/nav"
import { Seo } from "../../src/components/seo"
import { Figure } from "../../src/components/figure"
import { Header } from "../../src/components/header"

interface Props {
    projects: Page[]
    currentProjects: Page[]
}

interface State {
    isDevMode: boolean
    hoveredImage: Image | null
}

class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isDevMode: false,
            hoveredImage: null,
        }
    }

    componentDidMount(): void {
        if (typeof window !== 'undefined') {
            this.onHashChange()
            window.addEventListener("hashchange", this.onHashChange, false)
        }
    }

    componentWillUnmount(): void {
        if (typeof window !== 'undefined') {
            window.removeEventListener("hashchange", this.onHashChange)
        }
    }

    onHashChange = () => {
        if (typeof window !== 'undefined' && window.location.hash === "#devmood") {
            this.toggleMood()
        }
    }

    toggleMood = () => {
        if (window !== undefined) {
            if (this.state.isDevMode) {
                document.body.classList.remove("dev")
            } else {
                document.body.classList.add("dev")
            }
        }
        this.setState({
            isDevMode: !this.state.isDevMode
        }, () => {
            if (window !== undefined) {
                window.dispatchEvent(new Event('resize'))
            }
        })
    }

    handleImageHover = (image: Image | null) => {
        this.setState({ hoveredImage: image })
    }

    render() {
        const { projects, currentProjects } = this.props

        // Filter AI-related projects - much more specific criteria
        const aiProjects = projects.filter(p => {
            // Very specific AI tags only
            const hasAITag = p.tags.includes('AI') || 
                           p.tags.includes('ML') || 
                           p.tags.includes('AI-native') ||
                           p.tags.includes('computer-vision') ||
                           p.tags.includes('semantic-search') ||
                           p.tags.includes('Machine Learning')
            
            // Very specific AI technologies in stack
            const hasAITech = p.stack && (
                p.stack.includes('TensorFlow') ||
                p.stack.includes('YOLOv3') ||
                p.stack.includes('LSTM') ||
                p.stack.includes('OpenPose') ||
                p.stack.includes('StyleGan2') ||
                p.stack.includes('Pix2Pix') ||
                p.stack.includes('Word2Vec')
            )
            
            return hasAITag || hasAITech
        })
        
        // Everything else
        const otherProjects = projects.filter(p => {
            const hasAITag = p.tags.includes('AI') || 
                           p.tags.includes('ML') || 
                           p.tags.includes('AI-native') ||
                           p.tags.includes('computer-vision') ||
                           p.tags.includes('semantic-search') ||
                           p.tags.includes('Machine Learning')
            
            const hasAITech = p.stack && (
                p.stack.includes('TensorFlow') ||
                p.stack.includes('YOLOv3') ||
                p.stack.includes('LSTM') ||
                p.stack.includes('OpenPose') ||
                p.stack.includes('StyleGan2') ||
                p.stack.includes('Pix2Pix') ||
                p.stack.includes('Word2Vec')
            )
            
            return !(hasAITag || hasAITech)
        })

        return (
            <div>
                <Header currentPage="projects" />
                <br/>
                <br/>
                <br/>
                
                <div className={`container home`}>
                    <Seo/>
                    <div className="main-layout">
                        <div className="projects-column">
                            <section className={"projectListWrapper"}>
                                <small className={"sans-serif section-title"}>AI & Machine Learning</small>
                                <br/>
                                <Nav projects={aiProjects}
                                     textColor={"#0000FF"}
                                     withStack={false}
                                     onImageHover={this.handleImageHover}
                                />
                                <br/>
                                <br/>
                                <br/>
                                <small className={"sans-serif section-title"}>Creative Tools & Platforms</small>
                                <Nav projects={otherProjects}
                                     textColor={"#0000FF"}
                                     withStack={false}
                                     onImageHover={this.handleImageHover}
                                />
                            </section>
                        </div>
                        <div className="image-display-column">
                            {this.state.hoveredImage && (
                                <Figure imgData={this.state.hoveredImage} prefix="../" />
                            )}
                        </div>                    </div>
                    <footer className={"sans-serif"}>
                        <span className={"sans-serif section-title"}>Get in touch 👋</span>
                        <br/>
                        <small><a href={"javascript:;"}>amir.houieh@gmail.com</a></small>
                        <small><a href="https://github.com/amirhouieh/">Github</a>, </small>
                        <small><a href="https://twitter.com/amirhouieh">Twitter</a>, </small>
                        <small><a href="https://www.linkedin.com/in/amirhouieh/">Linkedin</a></small>
                    </footer>
                </div>
            </div>
        )
    }
}

export const getStaticProps: GetStaticProps = async () => {
    const dataPath = 'public/data.json'
    const data = JSON.parse(readFileSync(dataPath, 'utf8'))
    
    return {
        props: {
            projects: data.archivedProjects,
            currentProjects: data.currentProjects
        }
    }
}

export default Home
