import React from "react"
import {withSiteData} from 'react-static'
import {Page} from "../../data-module/lib/types";
import Nav from "../components/nav";
import {Seo} from "../components/seo";


interface Props {
    projects: Page[]
}

const Home: React.FunctionComponent<Props> = ({projects}) => (
    <div className="container home">
        <Seo />
        <Nav projects={projects}/>
    </div>
)


export default withSiteData(Home);
