import * as React from "react";

import {Image} from "../../data-module/lib/types";
import {mapRange} from "./blur-text";
import {Figure} from "./figure";


interface Props {
    images: Image[],
    initialIndex?: number;
    onClose: () => void;
}

interface State {
    currentIndex: number;
}

export class Sideshow extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);
        this.state = {
            currentIndex: this.props.initialIndex? this.props.initialIndex : 0,
        }
    }

    componentDidMount() {
        window.addEventListener("mousemove", this.onMouseMove);
        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.onMouseMove);
        document.body.style.overflow = "auto";
    }

    onMouseMove = (event: MouseEvent) => {
        this.setState({
            currentIndex: ~~mapRange(event.clientX, 0, window.innerWidth, 0, this.props.images.length)
        })
    };

    render(){
        const { currentIndex } = this.state;
        const { images } = this.props;
        return(
            <div className={`slideShow`}>
                <code className={"close-handler"} onClick={this.props.onClose}>[close]</code>
                <div className={"image-container"}>
                    <Figure imgData={images[currentIndex]} prefix={"../"}/>
                </div>
            </div>
        )
    }

}
