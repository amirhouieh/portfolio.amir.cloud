// @ts-ignore
import * as sequential from "promise-sequential";

import slugify from "slugify";
import * as path from "path";
import {lstatSync, readdirSync, writeFileSync} from "fs";

import {isNumber, isValidImageExt, isValidMarkdownExt, parseMd} from "./lib/utils";
import {processImage} from "./lib/image";
import {CONTENT_DIR, DATA_PATH} from "./lib/consts";
import {Page} from "./lib/types";


const processFolder = async (folderDir: string): Promise<Page> => {
    const IMAGES_DIR_PATH = path.join(folderDir, "images");

    console.log(`===`);
    console.log(`start porcess page: ${folderDir}`);

    const rootFiles = readdirSync(folderDir);
    const imagesFilenames = readdirSync(IMAGES_DIR_PATH);

    const thumbPath = rootFiles.find(isValidImageExt);
    const mdPath = rootFiles.find(isValidMarkdownExt);
    const imagesPath = imagesFilenames.filter(isValidImageExt).map((p) => path.join(folderDir, "images", p));

    const markdown = await parseMd(path.join(folderDir, mdPath));
    const thumb = await processImage(path.join(folderDir, thumbPath), markdown.title);

    const images = await sequential(
        imagesPath.map((img) => () => processImage(img, markdown.title)),
    );


    const slug = slugify(markdown.title, {lower: true});
    const date = markdown.body.match(/<code>(.*?)<\/code>/g).map((val) => {
        return val.replace(/<\/?code>/g,'');
    });

    const dateString = date? date[0] : "";
    let year: string = "-1";

    const getPadYear = (num: string) => num.length > 2 ? num.slice(2) : num;

    if( dateString.indexOf("-") > -1){
        const last = dateString.split("-")[1];
        if(isNumber(last)){
            year = last
        }else{
            year = new Date().getFullYear().toString()
        }
    }else{
        year = dateString
    }

    return {
        html: markdown.body,
        title: markdown.title,
        description: markdown.description,
        slug,
        thumb,
        images,
        dateString: dateString,
        dataYear: parseInt(getPadYear(year))
    };
};

const createProjectsPage = async (): Promise<Page[]> => {
    const list = readdirSync(CONTENT_DIR);

    const folders = list
        .map((f) => path.join(CONTENT_DIR, f))
        .filter((f) => lstatSync(f).isDirectory());

    const pages: Page[] = await sequential(
        folders.map((folderPath) => () => processFolder(folderPath)),
    );

    return pages.sort((a,b) => b.dataYear - a.dataYear);
};

(async () => {
    const pages = await createProjectsPage();
    writeFileSync(DATA_PATH, JSON.stringify({
        projects: pages
    }, null, 2));
})();
