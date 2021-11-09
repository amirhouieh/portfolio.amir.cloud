import {ImageSize} from "./image";

export const ImageExt = {
    JPG: ".jpg",
    JPEG: ".jpeg",
    PNG: ".png",
    GIF: ".gif",
};


export const VideoRemoteExt = {
    WEBLOC: ".webloc"
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
}

export enum VideoSource {
    VIMEO = "vimeo",
    YOUTUBE = "youtube"
}

export interface Image {
    src: string;
    srcSet: ImageSize[];
    caption: string | null;
    alt: string;
    order: number;
    r: number;
}

export interface Video {
    src: string;
    caption: string | null;
    order: number;
    source: VideoSource.VIMEO | VideoSource.YOUTUBE
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
        stack?: string[];
        title: string;
        year: number[];
        tags: string[];
        current?: boolean;
        link?: string;
        order?: number;
    }
}

export interface Page {
    html: string;
    images: Image[];
    videos: Video[];
    thumb: Image | null;
    slug: string;
    current: boolean;
    dateString: string;
    dataYear: number;
    description: string;
    title: string;
    tags: string[];
    stack: string[] | null;
    link?:string;
    order?: number
}
