import {Page} from "../types";
import {getJs, getStyle} from "./assets";
import {generateSeo} from "./seo";
import {genearetGeneralJSONLD} from "./jsonld";
import {createHeader} from "./header";
import {createPageThumbnail} from "./page";

export const createIndexHtml = (pages: Page[]): string => {
    return (`
    <!DOCTYPE html>
    <html>
        <head>
            ${getStyle("base.css")}
            ${getStyle("index.css")}
            ${getJs("index.js")}
            ${generateSeo(
                "amir houieh / highlighted projects",
                "Highlighted projects by amir houieh.",
            )}
            ${genearetGeneralJSONLD()}
        </head>
        <body>
            <div class="container">
               ${createHeader()}
               <div class="pages">
                    ${ pages.map(createPageThumbnail).join("") }
                </div>
            </div>
        </body>
    </html>
    `);
};
