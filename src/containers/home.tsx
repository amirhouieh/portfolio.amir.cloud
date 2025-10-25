import React from "react"
import { withSiteData } from 'react-static'
import { Page } from "../../data-module/lib/types";
import Nav from "../components/nav";
import { Seo } from "../components/seo";
import { PageThumbnailSimpleWithNativeBlue } from "../components/page";


interface Props {
    projects: Page[];
    currentProjects: Page[];
}

interface State {
    isDevMode: boolean
}

class Home extends React.Component<Props, State> {
    constructor(props: Props) {
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
        if (window.location.hash === "#devmood") {
            this.toggleMood();
        }
    };

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
                window.dispatchEvent(new Event('resize'));
            }
        });

    };

    render() {
        const {projects, currentProjects} = this.props;

        return (
            <div className={`container home`}>
                <Seo/>
                <section className={"projectListWrapper"}>
                    <small className={"sans-serif section-title"}>Platforms, Systems and Tools</small>
                    <br/>
                    <Nav projects={projects.filter(p => p.order&&p.order)}
                         textColor={"blue"}
                         withStack={false}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <small className={"sans-serif section-title"}>Other Projects</small>
                    <Nav projects={projects.filter(p => !p.order)}
                         textColor={"blue"}
                         withStack={false}
                    />
                </section>
                <footer className={"sans-serif"}>
                    <span className={"sans-serif section-title"}>Get in touch 👋</span>
                    <br/>
                    <small><a href={"javascript:;"}>amir.houieh@gmail.com</a></small>
                    <small><a href="https://github.com/amirhouieh/">Github</a>, </small>
                    <small><a href="https://twitter.com/amirhouieh">Twitter</a>, </small>
                    <small><a href="https://www.linkedin.com/in/amirhouieh/">Linkedin</a></small>
                </footer>
            </div>
        );
    }
}


export default withSiteData(Home);
