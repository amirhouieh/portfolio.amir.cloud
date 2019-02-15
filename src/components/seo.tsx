import * as React from "react";
import {Head} from "react-static";
//@ts-ignore
import urljoin from "url-join";
import htmlToText from "html2plaintext";

interface IProps {
    title?: string;
    keywords?: string;
    description?: string;
    path?: string;
    imagePath?: string;
}


const BASE_URL = "https://portfolio.amir.cloud";

export const Seo: React.FunctionComponent<IProps> = (props) => {
    const {
        title = "Amir Houieh / highlighted projects",
        keywords = "amir houieh, amirhouieh",
        description = "This is a showcase for highlighted projects by Amir Houieh.",
        path = "",
        imagePath = "site-thumb.png",
    } = props;

    const url = urljoin(BASE_URL, path);
    const imageUrl = urljoin(BASE_URL, imagePath);
    const cleanDescription = htmlToText(description).slice(0, 300) + "...";

    return (
        <Head>
            <title>{title}</title>
            <meta name={`keywords`} content={keywords}/>
            <meta name={`description`} content={`${cleanDescription}`}/>
            <meta name={`copyright`} content={`amir.cloud`}/>
            <meta name={`language`} content={`EN`}/>
            <meta name={`Classification`} content={`Design/Programming`}/>
            <meta name={`author`} content={`Amir, amir.houieh@gmail.com`}/>
            <meta name={`designer`} content={`amir houieh`}/>
            <meta name={`owner`} content={`amir houieh`}/>
            <meta name={`url`} content={`${url}`}/>
            <meta name={`identifier-URL`} content={`${url}`}/>
            <meta property={`og:title`} content={`${title}`}/>
            <meta property={`og:url`} content={`${url}`}/>
            <meta property={`og:image`} content={`${imageUrl}`}/>
            <meta property={`og:site_name`} content={`amir houieh`}/>
            <meta property="og:type" content="website"/>
            <meta property={`og:description`} content={`${cleanDescription}`}/>
            <meta name="twitter:image" content={imageUrl}/>

            <meta itemProp="name" content={`${url}`} />
            <meta itemProp="description" content={`${cleanDescription}`} />
            <meta itemProp="image" content={imageUrl} />

            <script type="application/ld+json">{`
              {
                "@context": "https://json-ld.org/contexts/person.jsonld",
                "name": "Amir Houieh",
                "born": "1987-03-22",
                "url": "amir.houieh",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "availableLanguage": ["English"]
                },
                  "sameAs": [
                  "https://www.linkedin.com/in/amirhouieh",
                  "https://github.com/amirhouieh",
                  "https://vimeo.com/user13046302",
                  "https://twitter.com/amirhouieh"
                ]
              }
        `}</script>
        </Head>
    );
};
