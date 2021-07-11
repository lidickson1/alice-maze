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
        //when selected display its paths (even if it is not the solution) (there can be multiple due to step sizes)
        //TODO draw lines and numbers for the paths, because the fact that you can visit a cell multiple times, and that there are multiple step sizes it is impossible to follow with just colors
        let color;
        if (this.props.visit === VisitType.VISITING) {
            color = "#66FF66";
        } else if (this.props.cellType === CellType.START) {
            color = "#FF7FED";
        } else if (this.props.visit === VisitType.ON_PATH) {
            color = "#33e5b2";
        } else if (this.props.visit === VisitType.VISITED) {
            color = "#00CCFF";
        } else if (this.props.x % 2 === this.props.y % 2) {
            color = "#CCCCCC";
        } else {
            color = "#DDDDDD";
        }

        const cellSize = parseInt(
            getComputedStyle(document.querySelector(":root")).getPropertyValue(
                "--cell-size"
            )
        );
        // console.log(cellSize);
        const margin = cellSize * 0.16;
        const stroke = cellSize * 0.08;
        const fontSize = 20;

        const text = [];
        //hardcoded text locations, I have tried other solutions (for example involving precomputing the sizes) but they were complicated and did not work well
        const textLocations = {
            0: [
                [cellSize / 2, margin],
                [cellSize / 2 - fontSize, margin],
                [cellSize / 2 + fontSize, margin],
            ],
            1: [
                [cellSize - margin, margin],
                [cellSize - margin - fontSize, margin],
                [cellSize - margin, margin + fontSize],
            ],
            2: [
                [cellSize - margin, cellSize / 2],
                [cellSize - margin, cellSize / 2 - fontSize],
                [cellSize - margin, cellSize / 2 + fontSize],
            ],
            3: [
                [cellSize - margin, cellSize - margin],
                [cellSize - margin, cellSize - margin - fontSize],
                [cellSize - margin - fontSize, cellSize - margin],
            ],
            4: [
                [cellSize / 2, cellSize - margin],
                [cellSize / 2 - fontSize, cellSize - margin],
                [cellSize / 2 + fontSize, cellSize - margin],
            ],
            5: [
                [margin, cellSize - margin],
                [margin, cellSize - margin - fontSize],
                [margin + fontSize, cellSize - margin],
            ],
            6: [
                [margin, cellSize / 2],
                [margin, cellSize / 2 - fontSize],
                [margin, cellSize / 2 + fontSize],
            ],
            7: [
                [margin, margin],
                [margin + fontSize, margin],
                [margin, margin + fontSize],
            ],
        };
        if (this.props.solution !== null) {
            // console.log(this.props.solution);
            for (const [direction, list] of this.props.solution) {
                if (list.length > 0) {
                    const locations = textLocations[direction];
                    for (
                        let i = 0;
                        i < Math.min(locations.length, list.length);
                        i++
                    ) {
                        text.push(
                            <text
                                x={locations[i][0]}
                                y={locations[i][1]}
                                dominant-baseline="middle"
                                text-anchor="middle"
                                font-size="16"
                                fill="white"
                                stroke="black"
                                stroke-width="0.6"
                                font-weight="bold"
                            >
                                {list[i].i}
                            </text>
                        );
                    }
                }
            }
        }

        let content;
        if (this.props.cellType === CellType.GOAL) {
            content =
                "GOAL" +
                (this.props.solution === null
                    ? ""
                    : " " +
                      Array.from(this.props.solution.values()).find(
                          (list) => list.length > 0
                      )[0].i);
        } else {
            content = (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={cellSize}
                    height={cellSize}
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
                            x1={cellSize / 2}
                            y1={
                                this.props.arrows.length > 1
                                    ? cellSize / 2
                                    : cellSize - margin
                            }
                            x2={cellSize / 2}
                            y2={margin}
                            stroke={this.props.color.value}
                            strokeWidth={stroke}
                            markerEnd={
                                "url(#arrowhead_" + this.props.color.name + ")"
                            }
                            transform={
                                "rotate(" +
                                arrow * 45 +
                                " " +
                                cellSize / 2 +
                                " " +
                                cellSize / 2 +
                                ")"
                            }
                            key={index}
                        />
                    ))}
                    {text}
                </svg>
            );
        }
        // const textBoxes = document.querySelectorAll(".solution_number");
        // for (const box of textBoxes) {
        //     console.log(box.getBBox().height);
        //     if (box.getAttribute("y") + box.getBBox().height > cellSize) {
        //         box.setAttribute("y", cellSize - box.getBBox().height - 3);
        //     }
        // }
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

// function rotate_point(center_x, center_y, angle, x, y) {
//     const s = Math.sin(angle);
//     const c = Math.cos(angle);

//     // translate point back to origin:
//     x -= center_x;
//     y -= center_y;
//     // rotate point
//     const xnew = x * c - y * s;
//     const ynew = x * s + y * c;

//     // translate point back:
//     x = xnew + center_x;
//     y = ynew + center_y;
//     return [x, y];
// }
