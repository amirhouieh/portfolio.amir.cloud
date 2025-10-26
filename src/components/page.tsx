import * as React from "react";
import {Page} from "../../data-module/lib/types";
import Link from "next/link";
import { BlurText, BlurTextNative } from "./blur-text";

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
    <h2 className="page-info" style={{ fontSize: '20px', textTransform: 'none' }}>{title}</h2>
);

export const PageDate: React.FunctionComponent<{dateString: string}> = ({dateString}) => (
    <code className="date" style={{ fontSize: '10px' }}>{dateString}</code>
);

export const PageHeader: React.FunctionComponent<{page: Page, current?: boolean, showStack?: boolean, showExternalLink?: boolean}> = ({page, current=false, showStack=false, showExternalLink=true}) => (
    <div className={"page-header"}>
        <Link href={`/${page.slug}`} style={{display: "none"}}/>
        <PageDate dateString={current? `${page.dateString}-present` : page.dateString} />
        <PageTitle title={page.title}/>
        <PageTags tags={page.tags} />
        {
            (showStack && page.stack) &&
                <PageStack stack={page.stack} />
        }
        {
            (page.link && showExternalLink) &&
                <a href={page.link} target={"_blank"} className="external-link">
                    {page.link}
                </a>
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
    showStack?: boolean
}> = ({page, onClick, onMouseIn = noop, onMouseOut = noop, textColor="black", showStack=false}) => {
    // Check if narrow screen or touch device
    const isNarrow = typeof window !== 'undefined' && (window.innerWidth <= 800 || ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    const maxBlur = isNarrow ? 2 : 15;
    
    return (
        <div className="page-thumbnail"
             onMouseEnter={() => {
                 onMouseIn();
             }}
             onMouseOver={() => console.log("over")}
             onMouseLeave={()=>{
                 onMouseOut();
             }}
        >
            <BlurText fontSize={24}
                      color={textColor}
                      title={page.slug}
                      distanceSensitivity={0.5}
                      maxVolume={maxBlur}
                      onClick={() => {
                          if(onClick){
                              onClick(page);
                          }
                      }}
            >
            <PageHeader page={page} showStack={showStack} showExternalLink={false}/>
            {page.blurb && (
                <div className="blurb" 
                     style={{fontSize: "13px", marginTop: "5px", lineHeight: "1.4", fontFamily: "sans-serif"}}
                >
                    {page.blurb}
                </div>
            )}
        </BlurText>
        <Link href={`/${page.slug}`} style={{display: "none"}}/>
    </div>
    );
};

export const PageThumbnailSimple: React.FunctionComponent<{page: Page, textColor: string}> = ({page, textColor}) => (
    <div className="page-thumbnail simple">
        <BlurText fontSize={16}
                  color={textColor}
                  blurVolume={5}
                  maxVolume={5}
                  onClick={() => {
                  }}
        >
            <PageHeader page={page} current={true}/>
            <br/>
            <div className="description" dangerouslySetInnerHTML={{
                __html: page.description
            }}/>
        </BlurText>
    </div>
);

export const PageThumbnailSimpleWithNativeBlue: React.FunctionComponent<{page: Page, textColor: string}> = ({page, textColor}) => (
    <div className="page-thumbnail simple native">
        <BlurTextNative
                  fontSize={16}
                  color={textColor}
                  blurVolume={5}
                  maxVolume={5}
        >
            <PageHeader page={page} current={true}/>
            <br/>
            <div className="description" dangerouslySetInnerHTML={{
                __html: page.description
            }}/>
        </BlurTextNative>
    </div>
);
