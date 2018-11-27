import * as React from "react";

import {Image} from "../../data-module/lib/types";
import {ImageSize} from "../../data-module/lib/image";
import {HTMLAttributes} from "react";

const createSrcSetQuery = (srcSet: ImageSize[], prefix: string): string =>{
    return srcSet.map((s) => `${prefix}${s.path} ${s.size}w`).join(", ")
};

interface Props {
    imgData: Image
    prefix?: string;
}

export const Figure: React.FunctionComponent<Props&HTMLAttributes<HTMLImageElement>> = ({imgData, prefix = "", ...rest}) => {
    return (
        <figure {...rest}>
            <img src={`${prefix}${imgData.src}`}
                 alt={imgData.alt}
                 srcSet={createSrcSetQuery(imgData.srcSet, prefix)}
            />
            {
                imgData.caption ?
                    <figcaption>{imgData.caption}</figcaption>
                    :
                    ""
            }
        </figure>
    )

}
