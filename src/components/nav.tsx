import React from "react"
import {Image, Page} from "../../data-module/lib/types";
import {RouteComponentProps, withRouter} from "react-router";
import {PageThumbnail} from "./page";
import {Figure} from "./figure";

interface Props {
    projects: Page[]
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
            redirect: false
        }
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
            this.props.history.push(`/${page.slug }`);
        }
    };

    onMuseIn = (page: Page) => {
        this.setState({hoveredThumb: page.thumb});
    }

    onMuseOut = () => {
        this.setState({hoveredThumb: null});
    }

    render() {
        const { projects } = this.props;
        return (
            <nav>
                {
                    projects.map((page, i) => (
                        <PageThumbnail page={page}
                                       key={`page-thumb-${i}`}
                                       onClick={this.onItemClicked}
                                       onMouseIn={() => this.onMuseIn(page)}
                                       onMouseOut={() => this.onMuseOut()}
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
