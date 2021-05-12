import React from "react";

export const Colors = {
    BLACK: { name: "black", value: "#000" },
    RED: { name: "red", value: "#F00" },
    YELLOW: { name: "yellow", value: "#FFFF00" },
};

//https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
export function getRandomColor() {
    const keys = Object.keys(Colors);
    return Colors[keys[(keys.length * Math.random()) << 0]];
}

export class ColorButtons extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        // console.log(event.target);
        this.props.updateColor(Colors[event.target.id]);
    }

    render() {
        return (
            <div onChange={this.onChange}>
                {Object.entries(Colors).map(([name, color], index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={name}
                            name="color"
                            checked={
                                this.props.selected !== null &&
                                this.props.selected.color === color
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
