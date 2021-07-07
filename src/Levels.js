import React from "react";

export const levels = [
    `S3 3  53 65 4
    1  5  63 15 7
    3  73 3  51 4
    1  5  64 2  4
    02 1  62 7  G`,
    `SR3 2 53 6 G
    1 5 65 2 7
    4 73 1 17 7
    3 1 53 0 40
    1 62 1 1 R6`,
];

export const exampleMaze = `432R G  5Y
0   0  5
S02  2  0`;

export class Levels extends React.Component {
    render() {
        return (
            <div
                className="btn-group mr-2 mb-4"
                role="group"
                aria-label="First group"
            >
                {levels.map((element, index) => (
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => this.props.loadMaze(element)}
                    >
                        {index + 1}
                    </button>
                ))}
                {/* <button type="button" className="btn btn-outline-primary">
                    1
                </button>
                <button type="button" className="btn btn-outline-primary">
                    2
                </button>
                <button type="button" className="btn btn-outline-primary">
                    3
                </button>
                <button type="button" className="btn btn-outline-primary">
                    4
                </button> */}
            </div>
        );
    }
}

// export default Levels;
