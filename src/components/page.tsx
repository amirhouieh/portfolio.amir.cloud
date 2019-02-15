import * as React from "react";
import {Page} from "../../data-module/lib/types";
import {Link} from "react-static";
import {BASE_URL} from "../../data-module/lib/consts";
import {BlurText} from "./blur-text";
import {Figure} from "./figure";

export const PageTags: React.FunctionComponent<{tags: string[]}> = ({tags}) => (
    <div className={"tags"} dangerouslySetInnerHTML={{
        __html: tags.map(tag => `<i>${tag}</i>`).join(", ")
    }}/>
);

export const PageTitle: React.FunctionComponent<{title: string}> = ({title}) => (
    <h2 className="page-info">{title}</h2>
);

export const PageDate: React.FunctionComponent<{dateString: string}> = ({dateString}) => (
    <code className="date">{dateString}</code>
);

export const PageHeader: React.FunctionComponent<{page: Page, current?: boolean}> = ({page, current=false}) => (
    <div className={"page-header"}>
        <Link to={`${BASE_URL}/${page.slug}`} style={{display: "none"}}/>
        <PageDate dateString={current? `${page.dateString}-present` : page.dateString} />
        <PageTitle title={page.title}/>
        <PageTags tags={page.tags} />
    </div>
);

const noop = () => {};

export const PageThumbnail: React.FunctionComponent<{
    page: Page,
    onClick?: (p: Page) => void,
    onMouseIn?: () => void,
    onMouseOut?: () => void,
}> = ({page, onClick, onMouseIn = noop, onMouseOut = noop}) => (
    <div className="page-thumbnail"
         onMouseEnter={() => {
             onMouseIn();
         }}
         onMouseLeave={()=>{
             onMouseOut();
         }}
    >
        <BlurText fontSize={50}
                  color={"blue"}
                  onClick={() => {
                      if(onClick){
                          onClick(page);
                      }
                  }}
        >
            <PageHeader page={page}/>
        </BlurText>
        <Link to={`${BASE_URL}/${page.slug}`} style={{display: "none"}}/>
        <p className="description"
           style={{display: "none"}}
        >
            {page.description}
        </p>
        <br/>
        <br/>
        <br/>
        {/*{*/}
            {/*page.thumb &&*/}
            {/*<Figure imgData={page.thumb}/>*/}
        {/*}*/}
    </div>
);




export const PageThumbnailSimple: React.FunctionComponent<{page: Page}> = ({page}) => (
    <div className="page-thumbnail simple">
        <BlurText fontSize={32}
                  color={"black"}
                  onClick={() => {
                  }}
        >
            <PageHeader page={page} current={true}/>
            <br/>
            <div className="description" dangerouslySetInnerHTML={{
                __html: page.description
            }}/>
        </BlurText>
        {/*{*/}
            {/*page.thumb &&*/}
            {/*<Figure imgData={page.thumb}/>*/}
        {/*}*/}
    </div>
);


