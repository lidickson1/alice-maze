import React from "react";
import CellType from "./CellType";
import { Colors } from "./Color";

class SaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let string = "";
        const data = this.props.data;
        for (let i = 0; i < data.length; i++) {
            let doArrows = false;
            if (data[i].cellType === CellType.START) {
                string += "S";
                doArrows = true;
            } else if (data[i].cellType === CellType.NORMAL) {
                doArrows = true;
            } else if (data[i].cellType === CellType.GOAL) {
                string += "G";
            }
            if (doArrows) {
                if (data[i].arrows.length === 0) {
                    string += "B";
                } else {
                    if (data[i].color !== Colors.BLACK) {
                        string += data[i].color.name.toUpperCase().charAt(0);
                    }
                    for (const arrow of data[i].arrows) {
                        string += arrow;
                    }
                }
            }
            if ((i + 1) % this.props.size === 0) {
                string += "\n";
            } else {
                string += " ";
            }
        }

        let file = new Blob([string], { type: "text/plain" });
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);
        a.href = url;
        a.download = "maze.txt";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    render() {
        return (
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.onClick}
            >
                Save
            </button>
        );
    }
}

export default SaveButton;
