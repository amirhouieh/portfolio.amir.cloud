import React from "react"
import { useRouter } from 'next/router'
import {Image, Page} from "../../data-module/lib/types";
import {PageThumbnail} from "./page";

interface Props {
    projects: Page[];
    textColor?: string;
    withStack: boolean;
    onImageHover?: (image: Image | null) => void;
}


const Nav: React.FC<Props> = ({ projects, textColor = "blue", withStack, onImageHover }) => {
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
        if (onImageHover) {
            onImageHover(page.thumb)
        }
    }

    const onMuseOut = () => {
        setState(prev => ({ ...prev, hoveredThumb: null }))
        if (onImageHover) {
            onImageHover(null)
        }
    }

    const { isTouch } = state

    return (
        <div className={"grid projectList"}>
            {
                projects.map((page, i) => {
                    return (
                        <PageThumbnail page={page}
                                       key={`page-thumb-${i}`}
                                       onClick={onItemClicked}
                                       onMouseIn={() => onMuseIn(page)}
                                       onMouseOut={() => onMuseOut()}
                                       textColor={textColor}
                                       showStack={withStack}
                        />
                    )
                })
            }
        </div>
    )
}

export default Nav

const isTouchDevice = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false;
    }
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
