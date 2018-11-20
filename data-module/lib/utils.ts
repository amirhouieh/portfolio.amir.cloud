import * as path from "path";
import {readFileSync} from "fs";
import * as marked from "marked";

import {ImageExt, MarkdownContent, MarkdownExt} from "./types";

export const MATCH_NUMBER = new RegExp(/^[0-9]*$/);

export const isNumber = (a: string) => a.match(MATCH_NUMBER);

export const isValidMarkdownExt = (filename: string): boolean =>
    [MarkdownExt.MARKDOWN, MarkdownExt.MD].includes( path.extname(filename) );

export const isValidImageExt = (filename: string): boolean =>
    [ImageExt.GIF, ImageExt.JPEG, ImageExt.JPG, ImageExt.PNG].includes( path.extname(filename) );

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
