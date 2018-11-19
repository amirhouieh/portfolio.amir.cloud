import {Image} from "../types";
import {ImageSize} from "../image";

const createSrcSetQuery = (srcSet: ImageSize[], prefix: string): string =>
    srcSet.map((s) => `${prefix}${s.path} ${s.size}w`).join(", ");

export const createImageHtml = (img: Image, prefix: string): string => (`
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
