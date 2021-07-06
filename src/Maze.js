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
        const mappedSolution = new Map();
        if (this.props.queue !== null) {
            for (const cell of this.props.queue.values()) {
                if (cell.depth > maxDepth) {
                    maxDepth = cell.depth;
                }
            }
            for (let i = 0; i < this.props.solution.length; i++) {
                const current = this.props.solution[i];
                let direction = 0;
                if (i < this.props.solution.length - 1) {
                    const nextCell = this.props.solution[i + 1];
                    if (nextCell.y < current.y && nextCell.x === current.x) {
                        direction = 0;
                    } else if (
                        nextCell.y < current.y &&
                        nextCell.x > current.x
                    ) {
                        direction = 1;
                    } else if (
                        nextCell.y === current.y &&
                        nextCell.x > current.x
                    ) {
                        direction = 2;
                    } else if (
                        nextCell.y > current.y &&
                        nextCell.x > current.x
                    ) {
                        direction = 3;
                    } else if (
                        nextCell.y > current.y &&
                        nextCell.x === current.x
                    ) {
                        direction = 4;
                    } else if (
                        nextCell.y > current.y &&
                        nextCell.x < current.x
                    ) {
                        direction = 5;
                    } else if (
                        nextCell.y === current.y &&
                        nextCell.x < current.x
                    ) {
                        direction = 6;
                    } else {
                        direction = 7;
                    }
                }
                if (!mappedSolution.has(direction)) {
                    mappedSolution.set(direction, []);
                }
                mappedSolution.get(direction).push({
                    ...current,
                    i: i,
                    direction: direction,
                });
            }
            console.log(mappedSolution);
        }
        return (
            <div className="maze">
                {this.props.data.map((props, index) => {
                    let visit = VisitType.NOT_VISITED;
                    if (this.props.queue !== null) {
                        //TODO only run this if in solve tab
                        if (this.props.queue.has(index)) {
                            if (
                                this.props.queue.get(index).depth === maxDepth
                            ) {
                                visit = VisitType.VISITING;
                            } else if (
                                //TODO this is inaccurate if a cell is visited multiple times in the solution
                                //it is possible to visit a cell the first time, but with the current step size it leads to nothing
                                //but during the next visit to the same cell where we have a different step size, it ends up in the solution
                                //so we need a way to differentiate both cases
                                this.props.solution.some(
                                    (element) =>
                                        element.x === props.x &&
                                        element.y === props.y
                                )
                            ) {
                                visit = VisitType.ON_PATH;
                            } else {
                                visit = VisitType.VISITED;
                            }
                        }
                    }
                    if (
                        this.props.adjacents !== null &&
                        this.props.adjacents.some(
                            (element) =>
                                element.x === props.x && element.y === props.y
                        )
                    ) {
                        visit = VisitType.VISITING;
                    } else if (
                        this.props.playedSteps !== null &&
                        this.props.playedSteps
                            .slice(0, this.props.playedStep + 1)
                            .map((element) => element[0])
                            .includes(index)
                    ) {
                        visit = VisitType.ON_PATH;
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
                            solution={
                                this.props.solution !== null &&
                                (visit === VisitType.ON_PATH ||
                                    visit === VisitType.VISITING)
                                    ? new Map(
                                          [...mappedSolution].map(([k, v]) => [
                                              k,
                                              v.filter(
                                                  (element) =>
                                                      element.x === props.x &&
                                                      element.y === props.y
                                              ),
                                          ])
                                      )
                                    : null
                            }
                        />
                    );
                })}
            </div>
        );
    }
}

export default Maze;
