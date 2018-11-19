import {ImageExt, MarkdownContent, MarkdownExt} from "./types";
import * as path from "path";
import {readFileSync, writeFileSync} from "fs";
import marked from "marked";
import {minify} from "html-minifier";
import slugify from "slugify";

const MATCH_NUMBER = new RegExp(/^[0-9]*$/);

export const isNumber = (a: string) => a.match(MATCH_NUMBER);

export const isValidMarkdownExt = (filename: string): boolean =>
    Object.values(MarkdownExt).includes(path.extname(filename));

export const isValidImageExt = (filename: string): boolean =>
    Object.values(ImageExt).includes(path.extname(filename));

export const createHTMLFile = (html: string, htmlPath: string): void => {
    try{
        const mini = minify(html, {collapseWhitespace: true})
        writeFileSync(htmlPath, mini);
    }catch (e) {
        console.log("error minifying");
        console.log(e);
    }
};

export const parseMd = async (mdPath: string): Promise<MarkdownContent> => {
    const md = readFileSync(mdPath, "utf8");

    const tokens = marked.lexer(md);
    const header = tokens.find( (t) => t.type === "heading");

    // @ts-ignore
    const longestPara = tokens.filter( (t) => t.text )
        .sort(
            // @ts-ignore
            (a, b) => b.text.length - a.text.length,
        )[0];

    // @ts-ignore
    const title = header ? header.text : path.basename(TEST_FOLDER_DIR);

    // @ts-ignore
    const description = longestPara ? longestPara.text : title;

    const body = marked.parser(tokens);

    return { title, body, description};
};
