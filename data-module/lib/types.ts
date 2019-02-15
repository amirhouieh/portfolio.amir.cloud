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
    r: number;
}

export interface GifImage {
    src: string;
    caption: string | null;
    alt: string;
    order: number;
}

export interface MarkdownContent {
    content: string;
    data: {
        description?: string;
        title: string;
        year: number[];
        tags: string[];
        current?: boolean;
    }
}

export interface Page {
    html: string;
    images: Image[];
    thumb: Image | null;
    slug: string;
    current: boolean;
    dateString: string;
    dataYear: number;
    description: string;
    title: string;
    tags: string[];
}
