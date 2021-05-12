import React from "react";
import CellType from "./CellType";
import { Colors } from "./Color";
// import { cloneDeep } from "lodash";

class SolveButton extends React.Component {
    constructor(props) {
        super(props);
        this.solve = this.solve.bind(this);
    }

    solve() {
        const maze = this.props.maze;
        const start = maze.find(
            (element) => element.cellType === CellType.START
        );
        // const goal = maze.find((element) => element.cellType === CellType.GOAL);
        const queue = [{ cell: start, stepSize: 1, path: [start], depth: 0 }];
        const visited = new Map();

        const directions = [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
        ];

        //each key is the depth of BFS tree
        const solvedSteps = {};
        let solution;

        let depth = 0;
        let popped = [];
        while (queue.length > 0) {
            const current = queue.shift();

            if (current.depth !== depth) {
                const queueMap = new Map();
                for (const element of popped) {
                    queueMap.set(
                        element.cell.y * this.props.size + element.cell.x,
                        element
                    );
                }
                solvedSteps[depth] = {
                    queue: queueMap,
                    // visited: cloneDeep(visited),
                };
                depth++;
                // popped = [];
            }

            popped.push(current);

            if (current.cell.color === Colors.RED) {
                current.stepSize++;
            } else if (current.cell.color === Colors.YELLOW) {
                current.stepSize--;
                if (current.stepSize === 0) {
                    continue;
                }
            }

            // current.distance++;

            for (const arrow of current.cell.arrows) {
                const neighbor_x =
                    current.cell.x + directions[arrow][0] * current.stepSize;
                const neighbor_y =
                    current.cell.y + directions[arrow][1] * current.stepSize;
                if (
                    neighbor_x >= 0 &&
                    neighbor_x < this.props.size &&
                    neighbor_y >= 0 &&
                    neighbor_y < this.props.size
                ) {
                    const neighbor_index =
                        neighbor_y * this.props.size + neighbor_x;
                    const neighbor = maze[neighbor_index];
                    if (
                        visited.has(current.stepSize) &&
                        visited.get(current.stepSize).includes(neighbor_index)
                    ) {
                        //cycle
                        continue;
                    }
                    if (!visited.has(current.stepSize)) {
                        visited.set(current.stepSize, []);
                    }
                    visited.get(current.stepSize).push(neighbor_index);
                    const newPath = [...current.path, neighbor];
                    queue.push({
                        cell: neighbor,
                        stepSize: current.stepSize,
                        path: [...current.path, neighbor],
                        depth: current.depth + 1,
                    });
                    if (neighbor.cellType === CellType.GOAL) {
                        solution = newPath;
                    }
                }
            }
        }

        // depth++;
        const queueMap = new Map();
        for (const element of popped) {
            queueMap.set(
                element.cell.y * this.props.size + element.cell.x,
                element
            );
        }
        solvedSteps[depth] = {
            queue: queueMap,
            // visited: cloneDeep(visited),
        };
        console.log(solvedSteps);

        if (solution !== undefined) {
            // console.log(solution);
        }

        this.props.setSolution(solvedSteps, solution);
    }

    render() {
        return (
            <button
                type="button"
                className="btn btn-success"
                onClick={this.solve}
            >
                Solve
            </button>
        );
    }
}

export default SolveButton;
