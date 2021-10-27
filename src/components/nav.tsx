import React from "react"
import { navigate } from "react-static";
import {Image, Page} from "../../data-module/lib/types";
import {RouteComponentProps, withRouter} from "react-router";
import {PageThumbnail} from "./page";
import {Figure} from "./figure";

interface Props {
    projects: Page[];
    textColor?: string;
    withStack: boolean;
}

interface State {
    isTouch: boolean;
    clickedItem: string | null;
    hoveredThumb: Image | null;
    redirect: boolean;
}

class Nav extends React.Component<Props & RouteComponentProps, State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        this.state = {
            isTouch: false,
            clickedItem: null,
            redirect: false,
            hoveredThumb: null
        }
    }

    componentDidMount(): void {
        this.setState({isTouch: isTouchDevice()})
    }

    onItemClicked = (page: Page) => {
        const { clickedItem } = this.state;

        this.setState({
            clickedItem: page.slug
        });

        if(isTouchDevice()){
            if( clickedItem && clickedItem === page.slug ){
                this.props.history.push(`/${page.slug }`);
            }
        }else{
            try{
                this.props.history.push(`/${page.slug }`);
            }catch (e) {
                console.log(e);
            }
        }
    };

    onMuseIn = (page: Page) => {
        this.setState({hoveredThumb: page.thumb});
    };

    onMuseOut = (page: Page) => {
        this.setState({hoveredThumb: null});
    };

    render() {
        const { projects, textColor = "blue", withStack} = this.props;
        const { isTouch } = this.state;

        return (
            <nav>
                {
                    projects.map((page, i) => (
                        <PageThumbnail page={page}
                                       key={`page-thumb-${i}`}
                                       onClick={this.onItemClicked}
                                       onMouseIn={() => this.onMuseIn(page)}
                                       onMouseOut={() => this.onMuseOut(page)}
                                       textColor={textColor}
                                       showStack={withStack}
                                       blurSize={isTouch? 5:50}
                        />
                    ))
                }
                {
                    this.state.hoveredThumb &&
                    <Figure imgData={this.state.hoveredThumb}/>
                }
            </nav>
        )
    }

};

export default withRouter<Props & RouteComponentProps<{}>>(Nav)

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
