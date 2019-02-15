import React from "react"
import {Page} from "../../data-module/lib/types";
import {RouteComponentProps, withRouter} from "react-router";
import {PageThumbnail} from "./page";

interface Props {
    projects: Page[]
}

interface State {
    isTouch: boolean;
    clickedItem: string | null;
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

    render() {
        const { projects } = this.props;

        return (
            <nav>
                {
                    projects.map((page, i) => (
                        <PageThumbnail page={page}
                                       key={`page-thumb-${i}`}
                                       onClick={this.onItemClicked}
                        />
                    ))
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
