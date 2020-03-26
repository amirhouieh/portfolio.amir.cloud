import * as React from "react";
import {Page} from "../../data-module/lib/types";
import {Link} from "react-static";
import {BASE_URL} from "../../data-module/lib/consts";
import {BlurText} from "./blur-text";

export const PageTags: React.FunctionComponent<{tags: string[]}> = ({tags}) => (
    <div className={"tags"} dangerouslySetInnerHTML={{
        __html: tags.map(tag => `<i>${tag}</i>`).join(", ")
    }}/>
);

export const PageStack: React.FunctionComponent<{stack: string[]}> = ({stack}) => (
    <div className={"stack"} dangerouslySetInnerHTML={{
        __html: stack.map(tag => `<span>${tag}</span>`).join("<span>, </span>")
    }}/>
);

export const PageTitle: React.FunctionComponent<{title: string}> = ({title}) => (
    <h2 className="page-info">{title}</h2>
);

export const PageDate: React.FunctionComponent<{dateString: string}> = ({dateString}) => (
    <code className="date">{dateString}</code>
);

export const PageHeader: React.FunctionComponent<{page: Page, current?: boolean, showStack?: boolean}> = ({page, current=false, showStack=false}) => (
    <div className={"page-header"}>
        <Link to={`${BASE_URL}/${page.slug}`} style={{display: "none"}}/>
        <PageDate dateString={current? `${page.dateString}-present` : page.dateString} />
        {
            page.link?
                <a href={page.link} target={"_blank"}>
                    <PageTitle title={page.title}/>
                </a>
                :
                <PageTitle title={page.title}/>
        }
        <PageTags tags={page.tags} />
        {
            (showStack && page.stack) &&
                <PageStack stack={page.stack} />
        }
    </div>
);

const noop = () => {};

export const PageThumbnail: React.FunctionComponent<{
    page: Page,
    onClick?: (p: Page) => void,
    onMouseIn?: () => void,
    onMouseOut?: () => void,
    textColor?: string,
    showStack?: boolean,
    blurSize?: number
}> = ({page, onClick, onMouseIn = noop, onMouseOut = noop, textColor="black", showStack=false, blurSize}) => (
    <div className="page-thumbnail"
         onMouseEnter={() => {
             onMouseIn();
         }}
         onMouseLeave={()=>{
             onMouseOut();
         }}
    >
        <BlurText fontSize={50}
                  maxVolume={blurSize}
                  color={textColor}
                  onClick={() => {
                      if(onClick){
                          onClick(page);
                      }
                  }}
        >
            <PageHeader page={page} showStack={showStack}/>
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
    </div>
);




export const PageThumbnailSimple: React.FunctionComponent<{page: Page, textColor: String}> = ({page, textColor}) => (
    <div className="page-thumbnail simple">
        <BlurText fontSize={32}
                  color={textColor}
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


