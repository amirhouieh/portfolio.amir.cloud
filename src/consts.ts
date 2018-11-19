export const SITE_DIR = process.env.NODE_ENV === "dev" ? "tmp_www" : "www";
export const SITE_IMAGES_FOLDER_DIR = process.env.NODE_ENV === "dev" ? "tmp_www/images" : "www/images";
export const CONTENT_DIR = "public/content";
export const ASSETS_DIR = "public/assets";
export const BASE_URL = process.env.NODE_ENV === "dev" ? "http://127.0.0.1" : "https://portfolio.amir.cloud";
