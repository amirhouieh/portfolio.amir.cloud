// @ts-ignore
import * as sequential from "promise-sequential";

import slugify from "slugify";
import * as path from "path";
import {lstatSync, readdirSync, writeFileSync} from "fs";

import {isValidImageExt, isValidMarkdownExt, isValidVideoExt, parseMd} from "./lib/utils";
import {processImage} from "./lib/image";
import {CONTENT_DIR, DATA_PATH} from "./lib/consts";
import {Page} from "./lib/types";
import {processRemoteVideo} from "./lib/video";

const processFolder = async (folderDir: string): Promise<Page> => {
    const IMAGES_DIR_PATH = path.join(folderDir, "images");

    console.log(`===`);
    console.log(`start porcess page: ${folderDir}`);

    const rootFiles = readdirSync(folderDir);
    const mediaFilenames = readdirSync(IMAGES_DIR_PATH);

    const thumbPath = rootFiles.find(isValidImageExt);
    const mdPath = rootFiles.find(isValidMarkdownExt);
    const imagesPath = mediaFilenames.filter(isValidImageExt).map((p) => path.join(folderDir, "images", p));
    const videosPath = mediaFilenames.filter(isValidVideoExt).map((p) => path.join(folderDir, "images", p));

    const markdown = await parseMd(path.join(folderDir, mdPath));
    const {title, year, description, tags} = markdown.data;
    const slug = slugify(title, {lower: true});

    const thumb = thumbPath? await processImage(path.join(folderDir, thumbPath), title) : null;

    const images = await sequential(
        imagesPath.map((img) => () => processImage(img, title)),
    );

    const videos = await sequential(
        videosPath.map((remoteVideo) => () => processRemoteVideo(remoteVideo)),
    );

    console.log(videos);

    return {
        html: markdown.content,
        title,
        description,
        tags,
        current: markdown.data.current && markdown.data.current === true,
        slug,
        thumb,
        images,
        dateString: year.join("-"),
        dataYear: year.length > 1 ? year.pop() : year.shift(),
        videos: videos
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
    const currentProjects = pages.filter((page) => page.current);
    const archivedProjects = pages.filter((page) => !page.current);
    writeFileSync(DATA_PATH, JSON.stringify({
        currentProjects,
        archivedProjects
    }, null, 2));
})();
