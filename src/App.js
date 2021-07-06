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
import Tabs from "./Tabs";
import { Modal } from "bootstrap";
import directions from "./Directions";
import Restart from "./Restart";
import { levels, Levels } from "./Levels";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    x: 0,
                    y: 0,
                    cellType: CellType.NORMAL,
                    color: Colors.BLACK,
                    arrows: [],
                },
            ],
            size: 4,
            selectedCell: 0,
            solvedSteps: null,
            stepButton: 1,
            selectedTab: "play",
            playedSteps: [[0, 0]],
            playedStep: 0,
            // playedButton: 1,
            solvedModal: new Modal(document.getElementById("solvedModal")),
            noSolutionModal: new Modal(
                document.getElementById("noSolutionModal")
            ),
        };
        // for (let y = 0; y < this.state.size; y++) {
        //     for (let x = 0; x < this.state.size; x++) {
        //         let arrows;
        //         do {
        //             arrows = [];
        //             for (let i = 0; i < 8; i++) {
        //                 if (Math.random() <= 1 / 8.0) {
        //                     arrows.push(i);
        //                 }
        //             }
        //         } while (arrows.length === 0);
        //         this.state.data.push({
        //             x: x,
        //             y: y,
        //             cellType: CellType.NORMAL,
        //             color: getRandomColor(),
        //             arrows: arrows,
        //         });
        //     }
        // }
        // this.state.data[0].cellType = CellType.START;
        // this.state.data[this.state.data.length - 1].cellType = CellType.GOAL;

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
        this.updatePlayedStep = this.updatePlayedStep.bind(this);
        this.updatePlayedButton = this.updatePlayedButton.bind(this);
        this.setSelectedTab = this.setSelectedTab.bind(this);
        this.setupPlay = this.setupPlay.bind(this);
        this.getAdjacentCells = this.getAdjacentCells.bind(this);

        // this.setupPlay();
        setTimeout(() => this.loadMaze(levels[0]), 1); //lol or else it crashes

        document
            .querySelector(":root")
            .style.setProperty("--size", this.state.size);
    }

    setupPlay() {
        const index = this.state.data.findIndex(
            (element) => element.cellType === CellType.START
        );
        let stepSize;
        if (this.state.data[index].color === Colors.RED) {
            stepSize = 2;
        } else if (this.state.data[index].color === Colors.YELLOW) {
            stepSize = 0;
        } else {
            stepSize = 1;
        }
        this.setState({
            selectedCell: index,
            // stepSize: stepSize,
            playedSteps: [[index, stepSize]],
            playedStep: 0,
            playedButton: 1,
        });
    }

    loadMaze(maze) {
        console.log("load maze");
        let size = null;
        let rows = 1;
        const data = [];
        for (const line of maze.split("\n")) {
            const row = line.trim().split(/ +/);
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

            // console.log(row);
            if (rows === size) {
                break;
            }
        }
        this.setState(
            {
                data: data,
                size: size,
                solvedSteps: null,
                stepButton: 1,
            },
            () => this.setupPlay()
        );
        // this.setupPlay();
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
        if (this.state.selectedTab === "play") {
            const findCell = this.getAdjacentCells(
                ...this.state.playedSteps[this.state.playedStep]
            ).find((element) => element.x === x && element.y === y);
            if (findCell === undefined) {
                return;
            } else if (findCell.cellType === CellType.GOAL) {
                this.state.solvedModal.show();
            }
        }
        this.setState((state) => {
            const index = y * state.size + x;
            let stepSize = state.stepSize;
            if (this.state.selectedTab === "play") {
                stepSize = this.state.playedSteps[this.state.playedStep][1];
                if (this.state.data[index].color === Colors.RED) {
                    stepSize++;
                } else if (this.state.data[index].color === Colors.YELLOW) {
                    stepSize--;
                }
            }
            return {
                selectedCell: state.selectedCell === index ? null : index,
                // stepSize: stepSize,
                playedSteps:
                    state.playedStep + 1 >= state.playedSteps.length
                        ? [...state.playedSteps, [index, stepSize]]
                        : [
                              ...state.playedSteps.slice(
                                  0,
                                  state.playedStep + 1
                              ),
                              [index, stepSize],
                              //   ...state.playedSteps.slice(state.playedStep + 2),
                          ],
                playedStep:
                    // state.playedStep === state.playedSteps.length - 1
                    state.playedStep + 1,
                // : state.playedStep,
                playedButton:
                    state.playedStep > state.playedButton
                        ? state.playedButton + 1
                        : state.playedButton,
            };
        });
    }

    getAdjacentCells(index, stepSize) {
        const cell = this.state.data[index];
        const adjacents = [];
        for (const arrow of cell.arrows) {
            const neighbor_x = cell.x + directions[arrow][0] * stepSize;
            const neighbor_y = cell.y + directions[arrow][1] * stepSize;
            if (
                neighbor_x >= 0 &&
                neighbor_x < this.state.size &&
                neighbor_y >= 0 &&
                neighbor_y < this.state.size
            ) {
                const adjacentCell =
                    this.state.data[neighbor_y * this.state.size + neighbor_x];
                if (
                    !(
                        adjacentCell.arrows.length === 0 &&
                        adjacentCell.cellType === CellType.NORMAL
                    )
                ) {
                    adjacents.push(adjacentCell);
                }
            }
        }
        return adjacents;
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
        if (solution === undefined) {
            this.state.noSolutionModal.show();
        } else {
            this.setState({
                solvedSteps: solvedSteps,
                solution: solution,
                step: solution.length - 1,
                stepButton: Math.max(solution.length - 2, 1),
            });
        }
    }

    updateStep(step) {
        if (step < this.state.solution.length) {
            this.setState({ step: step });
        }
    }

    updateStepButton(step) {
        this.setState({ stepButton: step });
    }

    updatePlayedStep(step) {
        if (step < this.state.playedSteps.length) {
            this.setState({
                playedStep: step,
                selectedCell: this.state.playedSteps[step][0],
            });
        }
    }

    updatePlayedButton(step) {
        this.setState({ playedButton: step });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.size !== this.state.size) {
            document
                .querySelector(":root")
                .style.setProperty("--size", this.state.size);
        }
    }

    setSelectedTab(tab) {
        this.setState({ selectedTab: tab });
    }

    render() {
        const selected =
            this.state.selectedCell === null
                ? null
                : this.state.data[this.state.selectedCell];
        let tabContent;
        if (this.state.selectedTab === "play") {
            tabContent = (
                <>
                    <p>
                        {"Step size: " +
                            this.state.playedSteps[this.state.playedStep][1]}
                    </p>
                    <SolveStep
                        step={this.state.playedStep}
                        maxStep={this.state.playedSteps.length - 1}
                        updateStep={this.updatePlayedStep}
                        middle={this.state.playedButton}
                        updateStepButton={this.updatePlayedButton}
                    />
                    <Restart restart={this.setupPlay} />
                </>
            );
        } else if (this.state.selectedTab === "edit") {
            tabContent = (
                <>
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
                    <SaveButton data={this.state.data} size={this.state.size} />
                </>
            );
        } else {
            tabContent = (
                <div className="row">
                    <div className="col">
                        <SolveButton
                            maze={this.state.data}
                            size={this.state.size}
                            setSolution={this.setSolution}
                        />
                    </div>
                    {this.state.solvedSteps !== null ? (
                        <div className="col">
                            <SolveStep
                                step={this.state.step}
                                maxStep={Math.max(
                                    this.state.solution.length - 1,
                                    2
                                )}
                                updateStep={this.updateStep}
                                middle={this.state.stepButton}
                                updateStepButton={this.updateStepButton}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            );
        }
        return (
            <div>
                <h3>Select a Maze</h3>
                <p>
                    The following 20 mazes are from Robert Abbott's original
                    website:
                </p>
                <Levels loadMaze={this.loadMaze} />
                <div className="row">
                    <div className="col-3">
                        <p>You can also choose to upload your own maze:</p>
                    </div>
                    <div className="col">
                        <LoadButton loadMaze={this.loadMaze} />
                    </div>
                </div>
                <div className="row mb-4">
                    <Tabs
                        selectTab={this.setSelectedTab}
                        selectedTab={this.state.selectedTab}
                    />
                </div>
                <div className="row">
                    <div className="col justify-content-center">
                        <Maze
                            data={this.state.data}
                            updateSelected={this.updateSelected}
                            selected={this.state.selectedCell}
                            queue={
                                this.state.solvedSteps === null ||
                                this.state.selectedTab !== "solve"
                                    ? null
                                    : this.state.solvedSteps[this.state.step]
                                          .queue
                            }
                            solution={
                                this.state.solvedSteps === null ||
                                this.state.selectedTab !== "solve"
                                    ? null
                                    : this.state.solution
                            }
                            playedSteps={
                                this.state.selectedTab === "play"
                                    ? this.state.playedSteps
                                    : null
                            }
                            playedStep={this.state.playedStep}
                            adjacents={
                                this.state.selectedTab === "play" &&
                                this.state.playedSteps.length > 0
                                    ? this.getAdjacentCells(
                                          ...this.state.playedSteps[
                                              this.state.playedStep
                                          ]
                                      )
                                    : null
                            }
                        />
                    </div>
                    <div className="col">{tabContent}</div>
                </div>
            </div>
        );
    }
}

// ReactDOM.render(<App />, document.getElementById("root"));

export default App;
