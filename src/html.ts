import {Image, Page} from "./types";
import * as uglifycss from "uglifycss";
import {readFileSync} from "fs";
import {ASSETS_DIR} from "./consts";
import {ImageSize} from "./image";

const createSrcSetQuery = (srcSet: ImageSize[], prefix: string): string =>
    srcSet.map((s) => `${prefix}${s.path} ${s.size}w`).join(", ");

const createImageHtml = (img: Image, prefix: string): string => (`
    <figure>
        <img src="${prefix}/${img.src}" alt="${img.alt}" srcset="${createSrcSetQuery(img.srcSet, prefix)}" />
        ${
    img.caption ?
        `<figcaption>${img.caption}</figcaption>`
        :
        ""
    }
    </figure>
`);

const createHeader = () => (`
<header class="blur">
    <h1><a href="/">
    /<span style="display: none">Amir Houieh</span>
    </a></h1>
    <br />
</header>
`);

const assests = {
    "index.js": readFileSync(`${ASSETS_DIR}/index.js`, "utf8"),
    "index.css": uglifycss.processString(readFileSync(`${ASSETS_DIR}/index.css`, "utf8")),
    "page.css": uglifycss.processString(readFileSync(`${ASSETS_DIR}/page.css`, "utf8")),
    "base.css": uglifycss.processString(readFileSync(`${ASSETS_DIR}/page.css`, "utf8")),
};

const { PORT = 3000,  NODE_ENV} = process.env;

const getStyle = (cssFile: string) => {
    if (NODE_ENV === "dev") {
        return `<link rel="stylesheet" type="text/css" href="http://127.0.0.1:${PORT}/assets/${cssFile}">`;
    } else {
        // @ts-ignore
        return `<style>${assests[cssFile]}</style>`;
    }
};

const getJs = (jsFile: string) => {
    if (process.env.NODE_ENV === "dev") {
        return `<script src="http://127.0.0.1:${PORT}/assets/${jsFile}">`;
    } else {
        // @ts-ignore
        return `<script>${assests[jsFile]}</script>`;
    }
};

export const createPageHtml = (page: Page): string => (`
<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i" rel="stylesheet">
        ${getStyle("base.css")}
        ${getStyle("page.css")}
        ${generateSeo(
    page.markdown.title,
    page.markdown.description,
    `https://projects.amir.cloud/${page.slug}`,
    `https://projects.amir.cloud/images/${page.thumb.src}`,
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

const createPageThumbnail = (page: Page): string => (`
    <div class="page-thumbnail blur">
        <a href="/${page.slug}">
            <h1 class="page-info">${page.markdown.title}</h1>
            <date class="date">${page.date}</date>
            <p class="description" style="display: none">${page.markdown.description}</p>
        </a>
        ${createImageHtml(page.thumb, "")}
    </div>
`);

const generateSeo = (
    title: string,
    description: string,
    url: string,
    imageUrl: string,
    tags: string[] = ["amir houieh", "amirhouieh"],
) => (`
            <title>${title}</title>
            <meta name="keywords" content=${tags} >
            <meta name="description" content="${description}" >
            <meta name="copyright" content="amir.cloud">
            <meta name="language" content="EN" >
            <meta name="Classification" content="Design/Programming">
            <meta name="author" content="Amir, amir.houieh@gmail.com">
            <meta name="designer" content="amir houieh">
            <meta name="owner" content="amir houieh">
            <meta name="url" content="${url}">
            <meta name="identifier-URL" content="${url}">
            <meta property="og:title" content="${title}">
            <meta property="og:url" content="${url}">
            <meta property="og:image" content="${imageUrl}">
            <meta property="og:site_name" content="amir houieh">
            <meta property="og:type" content="website" >
            <meta property="og:description" content="${description}">
            <meta name="twitter:image" content="${imageUrl}" >

            <link rel="shortcut icon"
                  type="image/x-icon"
                  href="favicon/android-icon-192x192.png"
            >
`);

const genearetGeneralJSONLD = () => (`
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Person",
    "name":"amir houieh",
    "born": "1987-03-22",
    "email": "mailto:amir.houieh@gmail.com",
    "image": "https://lh6.googleusercontent.com/-jHCMXjVi6KQ/AAAAAAAAAAI/AAAAAAAAAAA/DjqELgbiOuo/s128-c-k/photo.jpg",
    "jobTitle": "Design Technologist",
    "contactPoint": {
      "@type": "ContactPoint",
      "availableLanguage": ["English"]
    },
      "sameAs": [
          "https://www.linkedin.com/in/amirhouieh",
          "https://github.com/amirhouieh",
          "https://vimeo.com/user13046302",
          "https://twitter.com/amirhouieh"
    ]
  }
</script>`);

export const createIndexHtml = (pages: Page[]): string => {
    return (`
    <!DOCTYPE html>
    <html>
        <head>
            <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i" rel="stylesheet">
            ${getStyle("base.css")}
            ${getStyle("index.css")}
            ${getJs("index.js")}
    ${generateSeo(
        "amir houieh / highlighted projects",
        "Highlighted projects by amir houieh.",
        "https://projects.amir.cloud",
        "",
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
