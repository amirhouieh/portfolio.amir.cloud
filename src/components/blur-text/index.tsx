import React, {createRef, HTMLAttributes} from "react";

interface Props {
    fontSize: number;
    blurVolume?: number;
    color?: string;
    minVolume?: number;
    maxVolume?: number;
}

interface State {
    center: Point;
    blurVolume: number;
    maxDistance: number;
}

export interface Point {
    x: number;
    y: number;
};


export class BlurText extends React.Component<Props&HTMLAttributes<HTMLDivElement>, State>{
    private node = createRef<HTMLDivElement>();

    constructor(props: Props){
        super(props);
        this.state = {
            center: {x: 0, y:0},
            blurVolume: props.blurVolume ? props.blurVolume : 50,
            maxDistance: 0,
        }
    }

    componentDidMount() {
        this.onResize();
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("resize", this.onResize);
    }

    onResize = () => {
        const rect = this.node.current.getBoundingClientRect();
        this.setState({
            center: calcCenterPoint(rect),
            maxDistance: calcDistance({x:0, y:0}, {x: window.innerWidth, y: window.innerHeight}),
        });
    };

    onMouseMove = (event: MouseEvent) => {
        const { fontSize } = this.props;
        const { minVolume = 0, maxVolume = fontSize } = this.props;

        const dx = calcDistance(
            {x: event.clientX, y: event.clientY},
                this.state.center
            );

        this.setState({
            blurVolume: mapRange(dx, 0, this.state.maxDistance, minVolume, maxVolume)
        });
    };


    render(){
        const { color = "black", maxVolume, blurVolume, ...rest } = this.props;
        const blurSize = this.state.blurVolume;

        return (
            <div className={"blur"}
                 ref={this.node}
                 {...rest}
                 style={{
                      textShadow: `0 0 ${blurSize}px ${color}`,
                      color: "transparent",
                      display: "inline-block"
                  }}
            >
                {this.props.children}
            </div>
        )
    }
}


export const mapRange = (value: number, low1: number, high1: number, low2: number, high2: number): number => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export const calcCenterPoint = (rect: DOMRect | ClientRect): Point => {
    const x = rect instanceof DOMRect ? rect.x : rect.left;
    const y = rect instanceof DOMRect ? rect.y : rect.top;
    return {
        x: x + (rect.width / 2),
        y: y + (rect.height / 2),
    }
};

export const calcDistance = (p1: Point, p2: Point): number => {
    const a = p2.x - p1.x;
    const b = p2.y - p1.y;
    return Math.sqrt(a * a + b * b);
};
