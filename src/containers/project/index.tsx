import React from 'react'
import { withRouteData } from 'react-static'
import ReactPlayer from "react-player"

import {Page} from "../../../data-module/lib/types";
import {Figure} from "../../components/figure";
import {Sideshow} from "../../components/sideshow";

interface Props {
  project: Page
}

interface State {
    slideShowIndex: number|null;
    isNarrow: boolean;
}

import "./style.css"
import {Seo} from "../../components/seo";
import {PageHeader} from "../../components/page";

class Project extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {slideShowIndex: null, isNarrow: false}
    }

    componentDidMount() {
        this.onResize();
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }

    onResize = () => {
        if(!this.state.isNarrow && window.innerWidth <= 740){
            this.setState({isNarrow: true});
        }
    }

    showSlideShow = (index: number) => {
        console.log("u", index)
        this.setState({ slideShowIndex: index });
    }

    hideSlideShow = () => {
        this.setState({ slideShowIndex : null });
    }


    render(){
        const { project } = this.props;

        const figures = [project.thumb, ...project.images];

        return (
            <div className="project container">
                <Seo title={`${project.title} by Amir Houieh`}
                     description={project.description}
                     path={`${project.slug}`}
                     imagePath={project.thumb.src.replace("320", "1024")}
                />
                <div>
                    <PageHeader page={project} showStack={true}/>
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
                        figures.map((img, i) =>
                            <Figure imgData={img}
                                    onClick={() => this.showSlideShow(i)}
                                    key={`fig-${i}`}
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
        )
    }
}

export default withRouteData( Project );
