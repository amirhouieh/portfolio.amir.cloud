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
    const alt = `amir houieh - ${imgData.alt}`;

    return (
        <figure className={imgData.r > 1 ? "horizontal" : "vertical"}
                {...rest}
        >
            <a href={"javascript:;"} title={alt}>
                <img src={`${prefix}${imgData.src}`}
                     alt={alt}
                     title={alt}
                     srcSet={createSrcSetQuery(imgData.srcSet, prefix)}
                />
            </a>
            {
                imgData.caption ?
                    <figcaption>
                        {imgData.caption}
                    </figcaption>
                    :
                    ""
            }
        </figure>
    )

};

