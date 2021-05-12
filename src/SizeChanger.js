import React from "react";

class SizeChanger extends React.Component {
    constructor(props) {
        super(props);
        this.onInput = this.onInput.bind(this);
    }

    onInput(event) {
        // console.log(event.target.value);
        //if the input is invalid, it returns empty string which is falsy
        if (event.target.value) {
            this.props.updateSize(parseInt(event.target.value));
        }
    }

    render() {
        return (
            <div>
                <label htmlFor="size">Size (max 10):</label>
                <input
                    type="number"
                    id="size"
                    min="2"
                    max="10"
                    value={this.props.size}
                    onChange={this.onInput}
                ></input>
            </div>
        );
    }
}

export default SizeChanger;
