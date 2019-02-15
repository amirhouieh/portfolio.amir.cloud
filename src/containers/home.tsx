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

const Home: React.FunctionComponent<Props> = ({archivedProjects, currentProjects}) => (
    <div className="container home">
        <Seo />
        <section>
            <div className={"current-projects-wrapper"}>
                {
                    currentProjects.map((project, i) => (
                        <PageThumbnailSimple page={project}
                                             key={`c-page-thumb-${i}`}
                        />
                    ))
                }
            </div>
        </section>
        <br/>
        <br/>
        <section>
            <Nav projects={archivedProjects}/>
        </section>
        <footer>
            <a href={"https://amir.cloud"}>
                <code>> amir houieh</code>
            </a>
        </footer>
    </div>
);

export default withSiteData(Home);
