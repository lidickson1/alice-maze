import React from "react";
import Cell from "./Cell";
import VisitType from "./Visit";

class Maze extends React.Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
    }

    handler(x, y) {
        this.props.updateSelected(x, y);
    }

    render() {
        let maxDepth = 0;
        if (this.props.queue !== null) {
            for (const cell of this.props.queue.values()) {
                if (cell.depth > maxDepth) {
                    maxDepth = cell.depth;
                }
            }
        }
        return (
            <div className="maze">
                {this.props.data.map((props, index) => {
                    let visit = VisitType.NOT_VISITED;
                    if (this.props.queue !== null) {
                        if (this.props.queue.has(index)) {
                            if (
                                this.props.queue.get(index).depth === maxDepth
                            ) {
                                visit = VisitType.VISITING;
                            } else {
                                visit = VisitType.VISITED;
                            }
                        }
                    }
                    return (
                        <Cell
                            {...props}
                            key={index}
                            selected={
                                this.props.selected !== null &&
                                this.props.selected === index
                            }
                            handler={this.handler}
                            visit={visit}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Maze;
