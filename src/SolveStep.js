import React from "react";

class SolveStep extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.getClass = this.getClass.bind(this);
    }

    onClick(step) {
        this.props.updateStep(step);
    }

    previous() {
        if (this.props.step > 0) {
            this.props.updateStep(this.props.step - 1);
        }
        if (this.props.middle > 1 && this.props.step < this.props.middle) {
            this.props.updateStepButton(this.props.middle - 1);
        }
    }

    next() {
        if (this.props.step < this.props.maxStep) {
            this.props.updateStep(this.props.step + 1);
        }
        if (
            this.props.middle < this.props.maxStep - 1 &&
            this.props.step > this.props.middle
        ) {
            this.props.updateStepButton(this.props.middle + 1);
        }
    }

    getClass(value) {
        if (this.props.step === undefined || this.props.maxStep < value) {
            return "disabled";
        } else if (this.props.step !== undefined && this.props.step === value) {
            return "active";
        } else {
            return "";
        }
    }

    render() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={this.previous}>
                            Previous
                        </button>
                    </li>
                    <li
                        className={
                            "page-item " + this.getClass(this.props.middle - 1)
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => this.onClick(this.props.middle - 1)}
                        >
                            {this.props.step === undefined
                                ? 0
                                : this.props.middle - 1}
                        </button>
                    </li>
                    <li
                        className={
                            "page-item " + this.getClass(this.props.middle)
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => this.onClick(this.props.middle)}
                        >
                            {this.props.step === undefined
                                ? 1
                                : this.props.middle}
                        </button>
                    </li>
                    <li
                        className={
                            "page-item " + this.getClass(this.props.middle + 1)
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => this.onClick(this.props.middle + 1)}
                        >
                            {this.props.step === undefined
                                ? 2
                                : this.props.middle + 1}
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={this.next}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default SolveStep;
