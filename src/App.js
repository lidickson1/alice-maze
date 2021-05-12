import React from "react";
import CellType from "./CellType";
import { Colors, getRandomColor, ColorButtons } from "./Color";
import SolveButton from "./SolveButton";
import SizeChanger from "./SizeChanger";
import TypeButtons from "./TypeButtons";
import ArrowBoxes from "./ArrowBoxes";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";
import Maze from "./Maze";
import SolveStep from "./SolveStep";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            size: 4,
            selectedCell: null,
            solvedSteps: null,
            stepButton: 1,
        };
        for (let y = 0; y < this.state.size; y++) {
            for (let x = 0; x < this.state.size; x++) {
                let arrows;
                do {
                    arrows = [];
                    for (let i = 0; i < 8; i++) {
                        if (Math.random() <= 1 / 8.0) {
                            arrows.push(i);
                        }
                    }
                } while (arrows.length === 0);
                this.state.data.push({
                    x: x,
                    y: y,
                    cellType: CellType.NORMAL,
                    color: getRandomColor(),
                    arrows: arrows,
                });
            }
        }
        this.state.data[0].cellType = CellType.START;
        this.state.data[this.state.data.length - 1].cellType = CellType.GOAL;

        this.newCell = this.newCell.bind(this);
        this.loadMaze = this.loadMaze.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.updateCellType = this.updateCellType.bind(this);
        this.updateArrow = this.updateArrow.bind(this);
        this.setSolution = this.setSolution.bind(this);
        this.updateStep = this.updateStep.bind(this);
        this.updateStepButton = this.updateStepButton.bind(this);

        document
            .querySelector(":root")
            .style.setProperty("--size", this.state.size);
    }

    loadMaze(maze) {
        // let count = 0;
        // for (let i = 0; i < maze.length; i++) {
        //     if (maze[i] === "\r") {
        //         count++;
        //     }
        // }
        // console.log(count);
        let size = null;
        let rows = 1;
        const data = [];
        for (const line of maze.split("\n")) {
            const row = line.split(/ +/);
            if (size === null) {
                size = row.length;
            } else if (!row[0].startsWith("#")) {
                rows++;
            }

            //TODO row.length !== size, should throw error
            for (let x = 0; x < row.length; x++) {
                const cell = row[x].replace("\r", "");
                const cellData = this.newCell(x, rows - 1);
                let doArrows = true;
                if (cell.includes("S")) {
                    cellData.cellType = CellType.START;
                } else if (cell.includes("G")) {
                    cellData.cellType = CellType.GOAL;
                    doArrows = false;
                } else {
                    cellData.cellType = CellType.NORMAL;
                }
                if (doArrows) {
                    if (cell.includes("R")) {
                        cellData.color = Colors.RED;
                    } else if (cell.includes("Y")) {
                        cellData.color = Colors.YELLOW;
                    }
                    cellData.arrows = cell
                        .split("")
                        .filter((element) => !isNaN(element))
                        .map((element) => parseInt(element));
                }
                data.push(cellData);
            }

            console.log(row);
            if (rows === size) {
                break;
            }
        }
        this.setState({ data: data, size: size, selectedCell: null });
    }

    updateSize(size) {
        this.setState((state) => {
            let data;
            if (size < state.size) {
                data = state.data.filter(
                    (element) => element.x < size && element.y < size
                );
            } else if (size > state.size) {
                data = [];
                for (const cell of state.data) {
                    data.push(cell);
                    if (cell.x + 1 === state.size) {
                        for (let i = 1; i < size - cell.x; i++) {
                            data.push(this.newCell(cell.x + i, cell.y));
                        }
                    }
                }
                for (let j = 0; j < size - state.size; j++) {
                    for (let i = 0; i < size; i++) {
                        data.push(this.newCell(i, size - 1));
                    }
                }
            } else {
                data = state.data;
            }
            return { size: size, data: data, selectedCell: null };
        });
    }

    newCell(x, y) {
        return {
            x: x,
            y: y,
            cellType: CellType.NORMAL,
            color: Colors.BLACK,
            arrows: [],
        };
    }

    updateSelected(x, y) {
        this.setState((state) => {
            const index = y * state.size + x;
            return {
                selectedCell: state.selectedCell === index ? null : index,
            };
        });
    }

    updateColor(color) {
        this.updateCell(function (prev, cell) {
            cell.color = color;
        });
    }

    updateCellType(type) {
        this.updateCell(function (prev, cell) {
            cell.cellType = type;
        });
    }

    updateArrow(arrow, add) {
        this.updateCell(function (prev, cell) {
            if (add) {
                cell.arrows = [...prev.arrows, arrow];
            } else {
                cell.arrows = prev.arrows.filter(
                    (element) => element !== arrow
                );
            }
        });
    }

    updateCell(edit) {
        this.setState((state) => {
            const index = state.selectedCell;
            const cell = { ...state.data[index] };
            edit(state.data[index], cell);
            // console.log(cell);
            return {
                data: [
                    ...state.data.slice(0, index),
                    cell,
                    ...state.data.slice(index + 1),
                ],
            };
        });
    }

    setSolution(solvedSteps, solution) {
        // console.log(solvedSteps);
        this.setState({
            solvedSteps: solvedSteps,
            step: solution.length - 1,
            maxStep: solution.length - 1,
            stepButton: solution.length - 2,
        });
    }

    updateStep(step) {
        this.setState({ step: step });
    }

    updateStepButton(step) {
        this.setState({ stepButton: step });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.size !== this.state.size) {
            document
                .querySelector(":root")
                .style.setProperty("--size", this.state.size);
        }
    }

    render() {
        const selected =
            this.state.selectedCell === null
                ? null
                : this.state.data[this.state.selectedCell];
        return (
            <div className="row">
                <div className="col justify-content-center">
                    <Maze
                        data={this.state.data}
                        updateSelected={this.updateSelected}
                        selected={this.state.selectedCell}
                        queue={
                            this.state.solvedSteps === null
                                ? null
                                : this.state.solvedSteps[this.state.step].queue
                        }
                    />
                </div>
                <div className="col">
                    <SizeChanger
                        size={this.state.size}
                        updateSize={this.updateSize}
                    />
                    <hr />
                    <TypeButtons
                        selected={selected}
                        updateCellType={this.updateCellType}
                    />
                    <hr />
                    <ColorButtons
                        selected={selected}
                        updateColor={this.updateColor}
                    />
                    <hr />
                    <ArrowBoxes
                        selected={selected}
                        updateArrow={this.updateArrow}
                    />
                    <hr />
                    <div className="row">
                        <div className="col">
                            <LoadButton loadMaze={this.loadMaze} />
                        </div>
                        <div className="col">
                            <SaveButton
                                data={this.state.data}
                                size={this.state.size}
                            />
                        </div>
                        <div className="col">
                            <SolveButton
                                maze={this.state.data}
                                size={this.state.size}
                                setSolution={this.setSolution}
                            />
                        </div>
                        <div className="col">
                            <SolveStep
                                step={this.state.step}
                                maxStep={this.state.maxStep}
                                updateStep={this.updateStep}
                                middle={this.state.stepButton}
                                updateStepButton={this.updateStepButton}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// ReactDOM.render(<App />, document.getElementById("root"));

export default App;
