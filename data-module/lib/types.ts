import {ImageSize} from "./image";

export const ImageExt = {
    JPG: ".jpg",
    JPEG: ".jpeg",
    PNG: ".png",
    GIF: ".gif",
}

export const MarkdownExt = {
    MD: ".md",
    MARKDOWN: ".markdown",
};

export enum ImageSizes{
    LARGE = 1024,
    MEDIUM = 640,
    SMALL = 320,
    TINY = 20
};

export interface Image {
    src: string;
    srcSet: ImageSize[];
    caption: string | null;
    alt: string;
    order: number;
}

export interface GifImage {
    src: string;
    caption: string | null;
    alt: string;
    order: number;
}

export interface MarkdownContent {
    body: string;
    description: string;
    title: string;
}

export interface Page {
    html: string;
    images: Image[];
    thumb: Image;
    slug: string;
    dateString: string;
    dataYear: number;
    description: string;
    title: string;
}
