import {Page} from "../types";
import {getStyle} from "./assets";
import {generateSeo} from "./seo";
import {createHeader} from "./header";
import {createImageHtml} from "./image";
import {BASE_URL} from "../consts";

export const createPageThumbnail = (page: Page): string => (`
    <div class="page-thumbnail blur">
        <a href="/${page.slug}">
            <h1 class="page-info">${page.markdown.title}</h1>
            <date class="date">${page.date}</date>
            <p class="description" style="display: none">${page.markdown.description}</p>
        </a>
        ${createImageHtml(page.thumb, "")}
    </div>
`);

export const createPageHtml = (page: Page): string => (`
<!DOCTYPE html>
<html>
    <head>
        ${getStyle("base.css")}
        ${getStyle("page.css")}
        ${generateSeo(
    page.markdown.title,
    page.markdown.description,
    page.slug,
    `${BASE_URL}/images/${page.thumb.src}`,
)}
    </head>
    <body>
        <div class="container">
            ${createHeader()}
            <div class="page-info">${page.markdown.body}</div>
            <div class="page-images">
                ${createImageHtml(page.thumb, "../")}
                ${page.images.map((img) => createImageHtml(img, "../")).join("")}
            </div>
        </div>
    </body>
</html>
`);
