import React from "react";
import CellType from "./CellType";
import Form from "react-bootstrap/Form";

class ArrowBoxes extends React.Component {
    constructor(props) {
        super(props);
        this.getInput = this.getInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(id, checked) {
        // console.log(event.target);
        this.props.updateArrow(id, checked);
    }

    getInput(index) {
        return (
            // <input
            //     className="form-check-input"
            //     type="checkbox"
            //     id={index}
            //     checked={
            //         this.props.selected !== null &&
            //         this.props.selected.cellType !== CellType.GOAL &&
            //         this.props.selected.arrows.includes(index)
            //     }
            //     disabled={
            //         this.props.selected === null ||
            //         this.props.selected.cellType === CellType.GOAL
            //     }
            //     defaultChecked
            // />
            <Form.Check
                type="checkbox"
                id={index}
                // label={`default ${type}`}
                checked={
                    this.props.selected !== null &&
                    this.props.selected.cellType !== CellType.GOAL &&
                    this.props.selected.arrows.includes(index)
                }
                disabled={
                    this.props.selected === null ||
                    this.props.selected.cellType === CellType.GOAL
                }
                onChange={(event) => this.onChange(index, event.target.checked)}
                readOnly
            />
        );
    }

    render() {
        return (
            <div>
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
