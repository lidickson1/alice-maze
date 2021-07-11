import React from "react";

export const levels = [
    `S3 3  53 65 4
    1  5  63 15 7
    3  73 3  51 4
    1  5  64 2  4
    02 1  62 7  G`,
    `S3 2 53 6 G
    1 5 65 2 7
    4 73 1 17 7
    3 1 53 0 40
    1 62 1 1 R6`,
    `S2 3 2 23 Y5
    0 51 51 53 5
    3 75 72 73 5
    3 5 37 63 0
    G 1 0 7 R0`,
    `42 62 642 Y4
    S2 0 4 4
    0 604 6 64
    R0 6 62 G`,
    `3 24 62 46 6
    41 4 462 3 R64
    04 04 G 7 04
    1 7 R0 7 4
    1 Y62 S0 0 R6`,
    `R4 6 65 6 B B B
    G 624 7 06 B B B
    02 1 042 0 B B B
    4 03 73 R0 B B B
    0 1 74 06 B B B
    02 01 0 6 B B B
    Y0 S62 62 0 B B B`,
    `Y2 62 3 2 G B
    Y2 21 24 6 064 B
    B B B B B B
    0 0 6 S04 64 B
    R2 0 062 064 Y6 B
    R02 7 06 60 06 B`,
    `34 Y4 62 R5 6
    Y40 Y41 G 65 64
    04 2 73 035 0
    02 12 23 73 R0
    Y2 62 S61 01 R0`,
    `S4 4 6 64 6 R6
    3 53 35 65 6 760
    4 4 R0 R6 Y0 Y40
    14 24 R2 R2 52 0
    23 2 13 2 0 04
    1 R2 72 62 0 G`,
    `3 3 2 3 35 Y6 6
    24 10 Y64 1 6 62 65
    4 0 6 S64 37 24 R6
    B B B B B B B
    24 0 2 G 35 350 6
    R2 75 62 2 50 0 R0
    R2 Y1 72 762 7 0 0`,
    `S42 2 42 2 32 R4 4
    3 3 5 3 32 3 6
    02 Y5 2 61 4 4 4
    40 Y1 15 6 46 40 4
    30 3 15 37 7 7 5
    2 345 2 37 5 6 4
    R0 R1 R0 6 62 62 G`,
    `S3 25 5 5 26 5 62 4
    4 3 573 7 6 75 0 4
    41 4 3 04 62 17 47 4
    42 3 62 3 62 06 40 5
    34 1 3 1 3 61 7 05
    1 51 1 62 1 53 73 7
    43 17 62 3 51 37 51 4
    1 1 7 6 1 7 2 G`,
    `R2 4 52 R62 24 5 453 G
    2 74 R3 752 7 64 54 06
    2 4 40 46 735 6 5 6
    S0 4 R62 741 624 64 R6 6
    40 642 1 R04 36 64 53 0
    0 R2 12 2 2 02 0 04
    R2 R2 2 2 2 02 R7 R0
    B B B B B B B B`,
    `R24 2 26 4 Y5 42 46 Y4
    204 42 04 26 Y3 4 5 0
    204 2 402 1 3 4 6 5
    S042 20 Y4 4 Y2 62 G 5
    402 40 62 Y0 1 5 5 6
    042 Y0 Y3 6 6 Y7 2 0
    R20 20 Y1 26 26 1 Y062 6
    B B B B B B B B`,
    `Y2 5 4 62 62 2 R4
    2 2 R3 42 40 Y4 6
    40 3 362 G 3 7 47
    0 42 2 7 42 41 40
    0 1 61 4 R6 6 47
    02 Y0 0 0 6 6 60
    R0 67 6 S602 62 62 60`,
    `S42 2 R4 62 53 Y3 624 R4
    R3 2 26 04 2 04 04 5
    31 0 42 2 62 73 51 5
    31 Y3 2 62 04 04 Y73 4
    0 0 51 51 735 51 4 4
    04 51 751 4 62 4 04 75
    Y0 02 024 62 40 6 5 R7
    02 R0 06 6 1 2 R6 G`,
    `S42 4 2 R62 62 3 4 46
    R42 24 2 06 24 6 R46 6
    4 64 4 06 3 4 51 6
    2 04 24 R24 Y53 46 4 0
    2 42 4 2 41 4 51 7
    1 2 04 2 Y1 5 R6 Y0
    4 26 6 7 62 62 642 0
    R0 R1 62 62 6 1 6 G`,
    `43 624 64 Y6 6 6 6 6
    342 42 6 23 6 2 06 64
    42 4 G 624 3 0 6 0
    R4 042 3 Y1 R5 74 06 04
    0 24 0 R1 Y1 714 714 R0
    42 0 51 1 053 S62 0 064
    02 62 6 62 62 02 06 0
    02 02 2 6 Y2 62 062 06`,
    `S4 R4 Y62 3 5 5 B B
    1 2 42 4 6 4 B B
    2 1 51 04 4 0 B B
    04 Y4 04 751 Y0 0 B B
    04 3 0 6 64 04 B B
    04 2 73 3 5 6 B B
    2 1 1 71 R6 R6 B B
    1 3 R0 1 0 G B B`,
    `R2 42 53 62 Y2 3 4 Y64
    R3 4 45 42 R62 62 4 5
    3 3 1 0 62 64 54 64
    042 Y1 41 71 71 4 4 06
    R2 Y37 02 401 50 Y5 74 7
    03 571 7 5 4 7 74 6
    41 17 76 602 R62 62 6 0
    G S02 7 72 Y6 2 06 R0`,
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
