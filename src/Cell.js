import React from "react";
import CellType from "./CellType";
import VisitType from "./Visit";

export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // this.setState((state) => ({
        //     color: colors[(colors.indexOf(state.color) + 1) % colors.length],
        // }));
        this.props.handler(this.props.x, this.props.y);
    }

    render() {
        //TODO need to display if cell is on the solution path?
        //when selected display its paths (even if it is not the solution) (there can be multiple due to step sizes)
        let color;
        if (this.props.visit === VisitType.VISITING) {
            color = "#66FF66";
        } else if (this.props.visit === VisitType.VISITED) {
            color = "#00CCFF";
        } else if (this.props.cellType === CellType.START) {
            color = "#FF7FED";
        } else if (this.props.x % 2 === this.props.y % 2) {
            color = "#CCCCCC";
        } else {
            color = "#DDDDDD";
        }

        let content;
        if (this.props.cellType === CellType.GOAL) {
            content = "GOAL";
        } else {
            content = (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    // prevent svg itself from being clicked, because it can be rotated which would exceed the cell's box
                    // https://stackoverflow.com/a/43778490
                    style={{ pointerEvents: "none" }}
                >
                    <defs>
                        {/* lol need a separate marker for each color: https://stackoverflow.com/questions/16664584/changing-an-svg-markers-color-css */}
                        <marker
                            id="arrowhead_black"
                            viewBox="0 0 40 40"
                            refX="5"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="10"
                            markerHeight="10"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
                        </marker>
                        <marker
                            id="arrowhead_red"
                            viewBox="0 0 40 40"
                            refX="5"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="10"
                            markerHeight="10"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#F00" />
                        </marker>
                        <marker
                            id="arrowhead_yellow"
                            viewBox="0 0 40 40"
                            refX="5"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="10"
                            markerHeight="10"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFFF00" />
                        </marker>
                    </defs>
                    {/* <rect x="0" y="0" width="50" height="50" fill="#FFF" /> */}
                    {this.props.arrows.map((arrow, index) => (
                        <line
                            x1="25"
                            y1={this.props.arrows.length > 1 ? 25 : 42}
                            x2="25"
                            y2="8"
                            stroke={this.props.color.value}
                            strokeWidth="4"
                            markerEnd={
                                "url(#arrowhead_" + this.props.color.name + ")"
                            }
                            transform={"rotate(" + arrow * 45 + " 25 25)"}
                            key={index}
                        />
                    ))}
                </svg>
            );
        }

        return (
            <div
                className="cell"
                onClick={this.handleClick}
                style={{
                    backgroundColor: color,
                    borderColor: this.props.selected ? "lime" : "black",
                    // this.props.x % 2 === this.props.y % 2
                    //     ? "#00CCFF"
                    //     : "#66FF66",
                }}
            >
                {content}
            </div>
        );
        // return <h1>Hello, {this.props.name}</h1>;
    }
}
