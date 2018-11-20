import * as React from "react";

import {Image} from "../../data-module/lib/types";
import {ImageSize} from "../../data-module/lib/image";
import {HTMLAttributes, ImgHTMLAttributes} from "react";

const createSrcSetQuery = (srcSet: ImageSize[]): string =>
    srcSet.map((s) => `${s.path} ${s.size}w`).join(", ");

interface Props {
    imgData: Image
}

export const Figure: React.FunctionComponent<Props&HTMLAttributes<HTMLImageElement>> = ({imgData, ...rest}) => (
    <figure {...rest}>
        <img src={imgData.src}
             alt={imgData.alt}
             srcSet={createSrcSetQuery(imgData.srcSet)}
        />
        {
            imgData.caption ?
                <figcaption>{imgData.caption}</figcaption>
                :
                ""
        }
    </figure>
)
