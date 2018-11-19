import {lstatSync, mkdirSync, readdirSync} from "fs";
import * as path from "path";
import {createIndexHtml, createPageHtml} from "./html";
import slugify from "slugify";
import {createHTMLFile, isValidImageExt, isValidMarkdownExt, parseMd} from "./utils";
import {processImage} from "./image";

// @ts-ignore
import sequential from "promise-sequential";

import {Page} from "./types";
import {CONTENT_DIR, SITE_DIR} from "./consts";

const processFolder = async (folderDir: string): Promise<Page> => {
    const IMAGES_DIR_PATH = path.join(folderDir, "images");

    console.log(`===`);
    console.log(`start porcess page: ${folderDir}`);

    const rootFiles = readdirSync(folderDir);
    const imagesFilenames = readdirSync(IMAGES_DIR_PATH);

    const thumbPath = rootFiles.find(isValidImageExt);
    const mdPath = rootFiles.find(isValidMarkdownExt);
    const imagesPath = imagesFilenames.filter(isValidImageExt).map((p) => path.join(folderDir, "images", p));

    const thumb = await processImage(path.join(folderDir, thumbPath));
    const images = await sequential(
        imagesPath.map((img) => () => processImage(img)),
    );
    const markdown = await parseMd(path.join(folderDir, mdPath));

    const slug = slugify(markdown.title, {lower: true});
    const dir = path.join(SITE_DIR, slug);

    const date = markdown.body.match(/<code>(.*?)<\/code>/g);
    const page = {markdown, slug, thumb, images, date: date ? date[0] : ""};

    const html = createPageHtml(page);

    mkdirSync(dir);
    await createHTMLFile(html, path.join(dir, "index.html"));
    console.log(`html is generated for the page: ${dir}`);
    console.log(`===`);
    return page;
};

const createProjectsPage = async (): Promise<Page[]> => {
    const list = readdirSync(CONTENT_DIR);

    const folders = list
        .map((f) => path.join(CONTENT_DIR, f))
        .filter((f) => lstatSync(f).isDirectory());

    return sequential(
        folders.map((folderPath) => () => processFolder(folderPath)),
    );
};

(async () => {
    const pages = await createProjectsPage();
    const indexPageHtml = createIndexHtml(pages);
    const htmlPath = path.join(SITE_DIR, "index.html");
    createHTMLFile(indexPageHtml, htmlPath);
})();
