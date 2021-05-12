import React from "react";
import CellType from "./CellType";

class TypeButtons extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.updateCellType(CellType[event.target.id]);
    }

    render() {
        return (
            <div onChange={this.onChange}>
                {Object.entries(CellType).map(([name, value], index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={name}
                            name="cellType"
                            checked={
                                this.props.selected !== null &&
                                this.props.selected.cellType === value
                            }
                            disabled={this.props.selected === null}
                        />
                        <label htmlFor={name}>
                            {name.charAt(0) + name.slice(1).toLowerCase()}
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

export default TypeButtons;
