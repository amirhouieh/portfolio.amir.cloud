import * as path from "path";
import {readFileSync} from "fs";
import * as marked from "marked";

//@ts-ignore
import * as yamlFront from "yaml-front-matter";

import {ImageExt, MarkdownContent, MarkdownExt, VideoRemoteExt} from "./types";

export const MATCH_NUMBER = new RegExp(/^[0-9]*$/);

export const isNumber = (a: string) => a.match(MATCH_NUMBER);

export const isValidMarkdownExt = (filename: string): boolean =>
    [MarkdownExt.MARKDOWN, MarkdownExt.MD].includes( path.extname(filename) );

export const isValidImageExt = (filename: string): boolean =>
    [ImageExt.GIF, ImageExt.JPEG, ImageExt.JPG, ImageExt.PNG].includes( path.extname(filename) );

export const isValidVideoExt = (filename: string): boolean =>
    [VideoRemoteExt.WEBLOC].includes( path.extname(filename) );


const readMarkdown = async (rawMd: string): Promise<{
    [index: string]: any;
    __content: string;
}> => {
    return await yamlFront.loadFront(rawMd);
};

export const parseMd = async (mdPath: string): Promise<MarkdownContent> => {
    const mdRaw = readFileSync(mdPath, "utf8");
    const md = await readMarkdown(mdRaw)
        .catch((err): null => {
            console.log("error reading markdown", mdPath);
            console.log(err);
            return null
    });

    const tokens = marked.lexer(md.__content);
    // @ts-ignore
    const longestPara = tokens.filter( (t) => t.text )
        .sort(
            // @ts-ignore
            (a, b) => b.text.length - a.text.length,
        )[0];

    // @ts-ignore
    const description = longestPara ? marked.parse(longestPara.text) : title;

    const body = marked.parser(tokens);

    return {
        content: body,
        data:{
            title: md.title,
            year: md.year,
            tags: md.tags,
            description,
            current: md.current,
            stack: md.stack,
            link: md.link,
            order: md.order? parseInt(md.order): undefined
        }
    };

};
