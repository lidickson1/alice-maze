import React from "react";

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(id) {
        this.props.selectTab(id);
    }

    render() {
        return (
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={
                            "nav-link" +
                            (this.props.selectedTab === "play" ? " active" : "")
                        }
                        id="play-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#play"
                        type="button"
                        role="tab"
                        // aria-controls="play"
                        // aria-selected="true"
                        onClick={() => this.onClick("play")}
                    >
                        Play
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={
                            "nav-link" +
                            (this.props.selectedTab === "edit" ? " active" : "")
                        }
                        id="edit-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#edit"
                        type="button"
                        role="tab"
                        // aria-controls="edit"
                        // aria-selected="false"
                        onClick={() => this.onClick("edit")}
                    >
                        Edit
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={
                            "nav-link" +
                            (this.props.selectedTab === "solve"
                                ? " active"
                                : "")
                        }
                        id="solve-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#solve"
                        type="button"
                        role="tab"
                        onClick={() => this.onClick("solve")}
                    >
                        Solve
                    </button>
                </li>
            </ul>
        );
    }
}

export default Tabs;
