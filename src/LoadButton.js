import React from "react";

class LoadButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        document.getElementById("fileInput").click();
    }

    onChange(event) {
        // console.log(event.target.files);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            this.props.loadMaze(event.target.result);
        });
        reader.readAsText(file);
    }

    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onClick}
                >
                    Load
                </button>
                <input
                    id="fileInput"
                    type="file"
                    accept=".txt"
                    style={{ display: "none" }}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default LoadButton;
