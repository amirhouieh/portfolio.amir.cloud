import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { readFileSync } from 'fs'
import Link from 'next/link'
import ReactPlayer from "react-player"

import { Page } from "../data-module/lib/types"
import { Figure } from "../src/components/figure"
import { Sideshow } from "../src/components/sideshow"
import { Seo } from "../src/components/seo"
import { PageHeader } from "../src/components/page"
import { BlurText } from "../src/components/blur-text"
import { Header } from "../src/components/header"

interface Props {
  project: Page
}

interface State {
    slideShowIndex: number|null
    isNarrow: boolean
}

class Project extends React.Component<Props, State> {

    constructor(props: Props){
        super(props)
        this.state = {slideShowIndex: null, isNarrow: false}
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            this.onResize()
            window.addEventListener("resize", this.onResize)
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener("resize", this.onResize)
        }
    }

    onResize = () => {
        if (typeof window !== 'undefined' && !this.state.isNarrow && window.innerWidth <= 740){
            this.setState({isNarrow: true})
        }
    }

    showSlideShow = (index: number) => {
        console.log("u", index)
        this.setState({ slideShowIndex: index })
    }

    hideSlideShow = () => {
        this.setState({ slideShowIndex : null })
    }

    render(){
        const { project } = this.props

        const figures = [project.thumb, ...project.images]

        return (
            <div>
                <Header currentPage="project" projectName={project.title} />
                <br/>
                <br/>
                <br/>
                
                <div className="project container">
                    <Seo title={`${project.title} by Amir Houieh`}
                         description={project.description}
                         path={`${project.slug}`}
                         imagePath={project.thumb?.src.replace("320", "1024")}
                    />
                    <div>
                        <PageHeader page={project} showStack={true}/>
                        {
                            project.thumb && (
                                <div className="page-hero">
                                    <Figure imgData={project.thumb}
                                            onClick={() => this.showSlideShow(0)}
                                            prefix={"../"}
                                    />
                                </div>
                            )
                        }
                        <div className="page-info"
                             dangerouslySetInnerHTML={{
                                 __html: project.html
                             }}
                        />
                    </div>
                    <div className="page-images">
                        {
                            project.videos.map((video, i) =>
                                <ReactPlayer url={video.src}
                                             playing={true}
                                             key={`video-${i}`}
                                             width={"auto"}
                                />
                            )
                        }
                        {
                            figures.slice(1).map((img, i) =>
                                <Figure imgData={img}
                                        onClick={() => this.showSlideShow(i+1)}
                                        key={`fig-${i+1}`}
                                        prefix={"../"}
                                />
                            )
                        }
                    </div>
                    {
                        (
                            this.state.slideShowIndex !== null
                            &&
                            !this.state.isNarrow
                        ) &&
                            <Sideshow images={figures}
                                      initialIndex={this.state.slideShowIndex}
                                      onClose={() => this.hideSlideShow()}
                            />
                    }
                </div>
            </div>
        )
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const dataPath = 'public/data.json'
    const data = JSON.parse(readFileSync(dataPath, 'utf8'))
    
    const paths = data.archivedProjects.map((project: Page) => ({
        params: { slug: project.slug }
    }))
    
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const dataPath = 'public/data.json'
    const data = JSON.parse(readFileSync(dataPath, 'utf8'))
    
    const project = data.archivedProjects.find((p: Page) => p.slug === params?.slug)
    
    if (!project) {
        return {
            notFound: true
        }
    }
    
    return {
        props: {
            project
        }
    }
}

export default Project
