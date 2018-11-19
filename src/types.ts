import {ImageSize} from "./image";

export enum ImageExt {
    JPG = ".jpg",
    JPEG = ".jpeg",
    PNG = ".png",
    GIF = ".gif",
}

export enum MarkdownExt {
    MD = ".md",
    MARKDOWN = ".markdown",
}

export enum ImageSizes {
    LARGE = 1024,
    MEDIUM = 640,
    SMALL = 320,
}

export interface Image {
    src: string;
    srcSet: ImageSize[];
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
    markdown: MarkdownContent;
    images: Image[];
    thumb: Image;
    slug: string;
    date: string;
}
