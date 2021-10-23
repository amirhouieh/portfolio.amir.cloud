import React from "react"
import {withSiteData} from 'react-static'
import {Page} from "../../data-module/lib/types";
import Nav from "../components/nav";
import {Seo} from "../components/seo";
import {PageThumbnailSimple} from "../components/page";


interface Props {
    archivedProjects: Page[];
    currentProjects: Page[];
}

interface State {
    isDevMode: boolean
}

class Home extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            isDevMode: false,
        }
    }
    componentDidMount(): void {
        this.onHashChange();
        window.addEventListener("hashchange", this.onHashChange, false);
    }

    componentWillUnmount(): void {
        window.removeEventListener("hashchange", this.onHashChange);
    }

    onHashChange = () => {

        console.log("hashchange", window.location.hash);

        if(window.location.hash === "#devmood"){
            this.toggleMood();
        }
    };

    toggleMood = () => {
        if(window !== undefined){
            if(this.state.isDevMode){
                document.body.classList.remove("dev")
            }else{
                document.body.classList.add("dev")
            }
        }
        this.setState({
            isDevMode: !this.state.isDevMode
        }, () => {
            if(window !== undefined){
                window.dispatchEvent(new Event('resize'));
            }
        });

    };

    render(){
        const {archivedProjects, currentProjects} = this.props;
        const { isDevMode } = this.state;
        const projects = isDevMode?
            archivedProjects.filter((project) => {
                return project.stack !== null
            })
            :
            archivedProjects;

        return (
            <div className={`container home`}>
                <Seo />
                <section className={"mood-control"}>
                    <span className={`san-serif mood ${isDevMode? "":"on"}`} onClick={
                        () => { if(isDevMode) this.toggleMood(); }
                    }>Hybrid me</span>
                    <span><br/></span>
                    <span className={`san-serif mood ${isDevMode? "on":""}`} onClick={
                        () => { if(!isDevMode) this.toggleMood(); }
                    }>Developer me</span>
                </section>
                <section>
                    <h4 className={"san-serif"}>(CO)Founded & Entrepreneurial Works</h4>
                    <div className={"current-projects-wrapper"}>
                        {
                            currentProjects.map((project, i) => (
                                <PageThumbnailSimple page={project}
                                                     key={`c-page-thumb-${i}`}
                                                     textColor={isDevMode? "lightBlue": "black"}
                                />
                            ))
                        }
                    </div>
                </section>
                <br/>
                <br/>
                <br/>
                <br/>
                <section>
                    <h4 className={"san-serif"}>Other Projects</h4>
                    <Nav projects={projects}
                         textColor={isDevMode? "lightGray": "blue"}
                         withStack={isDevMode}
                    />
                </section>
                <footer>
                    {
                        isDevMode &&
                        <a href={"https://github.com/amirhouieh"}>
                            <code>> my github</code>
                            <br/>
                        </a>
                    }
                    <a href={"https://amir.cloud"}>
                        <code>> amir houieh</code>
                    </a>
                </footer>
            </div>
        );
    }
}


export default withSiteData(Home);
