import {readFileSync} from "fs";
import {ASSETS_DIR} from "../consts";
import * as uglifycss from "uglifycss";

const { PORT = 3000,  NODE_ENV} = process.env;

const assests = {
    "index.js": readFileSync(`${ASSETS_DIR}/index.js`, "utf8"),
    "index.css": uglifycss.processString(readFileSync(`${ASSETS_DIR}/index.css`, "utf8")),
    "page.css": uglifycss.processString(readFileSync(`${ASSETS_DIR}/page.css`, "utf8")),
    "base.css": uglifycss.processString(readFileSync(`${ASSETS_DIR}/base.css`, "utf8")),
};

export const getStyle = (cssFile: string) => {
    if (NODE_ENV === "dev") {
        return `<link rel="stylesheet" type="text/css" href="http://127.0.0.1:${PORT}/assets/${cssFile}">`;
    } else {
        // @ts-ignore
        return `<style>${assests[cssFile]}</style>`;
    }
};

export const getJs = (jsFile: string) => {
    if (process.env.NODE_ENV === "dev") {
        return `<script src="http://127.0.0.1:${PORT}/assets/${jsFile}">`;
    } else {
        // @ts-ignore
        return `<script>${assests[jsFile]}</script>`;
    }
};
