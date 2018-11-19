import {BASE_URL} from "../consts";

export const generateSeo = (
    title: string,
    description: string,
    url: string = "",
    imageUrl: string = `${BASE_URL}/assets/site-thumb.png`,
    tags: string[] = ["amir houieh", "amirhouieh"],
) => (`
            <title>${title}</title>
            <meta name="keywords" content=${tags} >
            <meta name="description" content="${description}" >
            <meta name="copyright" content="amir.cloud">
            <meta name="language" content="EN" >
            <meta name="Classification" content="Design/Programming">
            <meta name="author" content="Amir, amir.houieh@gmail.com">
            <meta name="designer" content="amir houieh">
            <meta name="owner" content="amir houieh">
            <meta name="url" content="${BASE_URL}/${url}">
            <meta name="identifier-URL" content="${BASE_URL}/${url}">
            <meta property="og:title" content="${title}">
            <meta property="og:url" content="${BASE_URL}/${url}">
            <meta property="og:image" content="${imageUrl}">
            <meta property="og:site_name" content="amir houieh">
            <meta property="og:type" content="website" >
            <meta property="og:description" content="${description}">
            <meta name="twitter:image" content="${imageUrl}" >
`);
