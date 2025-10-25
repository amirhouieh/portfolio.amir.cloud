import React from "react"
import { useRouter } from 'next/router'
import {Image, Page} from "../../data-module/lib/types";
import {PageThumbnail} from "./page";
import {Figure} from "./figure";

interface Props {
    projects: Page[];
    textColor?: string;
    withStack: boolean;
}


const Nav: React.FC<Props> = ({ projects, textColor = "blue", withStack }) => {
    const router = useRouter()
    const [state, setState] = React.useState({
        isTouch: false,
        clickedItem: null as string | null,
        hoveredThumb: null as Image | null
    })

    React.useEffect(() => {
        setState(prev => ({ ...prev, isTouch: isTouchDevice() }))
    }, [])

    const onItemClicked = (page: Page) => {
        const { clickedItem } = state

        setState(prev => ({
            ...prev,
            clickedItem: page.slug
        }))

        if(isTouchDevice()){
            if( clickedItem && clickedItem === page.slug ){
                router.push(`/${page.slug}`)
            }
        }else{
            try{
                router.push(`/${page.slug}`)
            }catch (e) {
                console.log(e)
            }
        }
    }

    const onMuseIn = (page: Page) => {
        setState(prev => ({ ...prev, hoveredThumb: page.thumb }))
    }

    const onMuseOut = () => {
        setState(prev => ({ ...prev, hoveredThumb: null }))
    }

    const { isTouch, hoveredThumb } = state

    return (
        <div className={"grid projectList"}>
            {
                projects.map((page, i) => (
                    <PageThumbnail page={page}
                                   key={`page-thumb-${i}`}
                                   onClick={onItemClicked}
                                   onMouseIn={() => onMuseIn(page)}
                                   onMouseOut={() => onMuseOut()}
                                   textColor={textColor}
                                   showStack={withStack}
                                   blurSize={isTouch? 3:25}
                    />
                ))
            }
            {
                hoveredThumb &&
                <Figure imgData={hoveredThumb}/>
            }
        </div>
    )
}

export default Nav

const isTouchDevice = () => {
    const deviceAgent = navigator.userAgent.toLowerCase();
    return (deviceAgent.match(/(iphone|ipod|ipad)/) ||
        deviceAgent.match(/(android)/) ||
        deviceAgent.match(/(iemobile)/) ||
        deviceAgent.match(/iphone/i) ||
        deviceAgent.match(/ipad/i) ||
        deviceAgent.match(/ipod/i) ||
        deviceAgent.match(/blackberry/i) ||
        deviceAgent.match(/bada/i) ||
        deviceAgent.match(/mobile/i)
    ) !== null;
};
