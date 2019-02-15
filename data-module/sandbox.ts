import {parseMd} from "./lib/utils";

(async() => {
    const md = await parseMd("/Users/xtxt/projects/amir.cloud.portfolio/public/content/repub/text.md");
    console.log(md);
})();
