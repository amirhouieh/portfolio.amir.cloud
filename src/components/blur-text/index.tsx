import React, { createRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';

interface Props {
    fontSize: number;
    blurVolume?: number;
    color?: string;
    minVolume?: number;
    maxVolume?: number;
    title?: string;
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
        if (typeof window !== 'undefined') {
            this.onResize();
            window.addEventListener("mousemove", this.onMouseMove);
            window.addEventListener("resize", this.onResize);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener("mousemove", this.onMouseMove);
            window.removeEventListener("resize", this.onResize);
        }
    }

    onResize = () => {
        if (typeof window !== 'undefined') {
            this.setState({
                maxDistance: calcDistance({x:0, y:0}, {x: window.innerWidth, y: window.innerHeight}),
            });
        }
    };

    onMouseMove = (event: MouseEvent) => {
        if (typeof window !== 'undefined' && this.node.current) {
            const { fontSize } = this.props;
            const { minVolume = 0, maxVolume = fontSize } = this.props;

            const rect = this.node.current.getBoundingClientRect();
            const center = calcCenterPoint(rect);

            const dx = calcDistance(
                {x: event.clientX, y: event.clientY},
                center
                );

            this.setState({
                blurVolume: mapRange(dx, 0, this.state.maxDistance, minVolume, maxVolume)
            });
        }
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


interface IBlurNativeProps extends HTMLAttributes<HTMLDivElement>{
    fontSize: number;
    blurVolume?: number;
    color?: string;
    minVolume?: number;
    maxVolume?: number;
    title?: string;
}

export const BlurTextNative = (props: IBlurNativeProps) => {
    const {maxVolume=10, minVolume=0, title, blurVolume, onBlur, color, fontSize, ...rest} = props;

    const ref = useRef(null);
    const [blur, setBlur] = useState(10);
    const [maxD, setMaxD] = useState(0);

    const onMouseMove = (event: MouseEvent) => {
        if(ref.current){
            const rect = ref.current.getBoundingClientRect();
            const center = calcCenterPoint(rect);
            const dx = calcDistance(
                {x: event.clientX, y: event.clientY},
                center
            );
            setBlur(
                mapRange(dx, 0, maxD, minVolume, maxVolume)
            )
        }
    }

    const onResize = () => {
        if (typeof window !== 'undefined') {
            setMaxD(
                calcDistance({x:0, y:0}, {x: window.innerWidth, y: window.innerHeight})
            );
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("resize", onResize);
            onResize();
            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("resize", onResize);
            }
        }
    }, [])

    return (
        <div className={"blur-native"}
             ref={ref}
             {...rest}
             style={{
                 filter: `blur(${blur}px)`,
                 fontSize: `${fontSize}px`
             }}
        >
            {props.children}
        </div>
    )

}


export const mapRange = (value: number, low1: number, high1: number, low2: number, high2: number): number => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export const calcCenterPoint = (rect: DOMRect): Point => {
    const x = rect.x;
    const y = rect.y;
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
