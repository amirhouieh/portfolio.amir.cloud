import React from "react"
import {Page} from "../../data-module/lib/types";
import {Figure} from "./figure";
import {BlurText} from "./blur-text";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
import {BASE_URL} from "../../data-module/lib/consts";
import {Link} from "react-static";

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

        // if(this.state.redirect){
        //     return <Redirect to={`/${this.state.clickedItem}`}/>
        // }

        return (
            <nav>
                {
                    projects.map((page, i) => (
                        <div className="page-thumbnail"
                             key={`page-thumb-${i}`}
                        >
                            <BlurText fontSize={50}
                                      color={"blue"}
                                      onClick={() => {
                                          this.onItemClicked(page);
                                      }}
                            >
                                <Link to={`${BASE_URL}/${page.slug}`} style={{display: "none"}}/>
                                <h2 className="page-info">{page.title}</h2>
                                <code className="date">{page.dateString}</code>
                            </BlurText>
                            <Link to={`${BASE_URL}/${page.slug}`} style={{display: "none"}}/>
                            <p className="description"
                               style={{display: "none"}}
                            >
                                {page.description}
                            </p>
                            <br/>
                            <br/>
                            <Figure imgData={page.thumb}/>
                        </div>)
                    )
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
