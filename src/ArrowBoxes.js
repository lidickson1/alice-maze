import React from "react";
import CellType from "./CellType";

class ArrowBoxes extends React.Component {
    constructor(props) {
        super(props);
        this.getInput = this.getInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        // console.log(event.target.checked);
        this.props.updateArrow(parseInt(event.target.id), event.target.checked);
    }

    getInput(index) {
        return (
            <input
                className="form-check-input"
                type="checkbox"
                id={index}
                checked={
                    this.props.selected !== null &&
                    this.props.selected.cellType !== CellType.GOAL &&
                    this.props.selected.arrows.includes(index)
                }
                disabled={
                    this.props.selected === null ||
                    this.props.selected.cellType === CellType.GOAL
                }
            />
        );
    }

    render() {
        return (
            <div onChange={this.onChange}>
                <h6>Arrows</h6>
                <div className="row">
                    <div className="col-1">{this.getInput(7)}</div>
                    <div className="col-1">{this.getInput(0)}</div>
                    <div className="col-1">{this.getInput(1)}</div>
                </div>
                <div className="row">
                    <div className="col-1">{this.getInput(6)}</div>
                    <div className="col-1"></div>
                    <div className="col-1">{this.getInput(2)}</div>
                </div>
                <div className="row">
                    <div className="col-1">{this.getInput(5)}</div>
                    <div className="col-1">{this.getInput(4)}</div>
                    <div className="col-1">{this.getInput(3)}</div>
                </div>
            </div>
        );
    }
}

export default ArrowBoxes;
