// @ts-ignore
import * as weblocParser from "webloc-parser";
import {Video, VideoSource} from "./types";
import {readFileSync} from "fs";
import * as path from "path";
import {isNumber} from "./utils";

export const processRemoteVideo = async (videoPath: string): Promise<Video> => {
    const videoContent = readFileSync(videoPath);
    const videoFilename = path.basename(videoPath);

    const url = await weblocParser.getUrl(videoContent);

    let order = -1;
    let caption = null;

    if (videoFilename.indexOf("__") > -1) {
        caption = videoFilename.split("__")[1];
    }

    if (isNumber(videoFilename[0])) {
        order = parseInt(videoFilename[0]);
    }

    return {
        src: url,
        source: url.indexOf( VideoSource.VIMEO ) > -1 ? VideoSource.VIMEO : VideoSource.YOUTUBE,
        caption: caption,
        order: order
    }
};
