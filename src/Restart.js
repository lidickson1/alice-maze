import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Restart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        this.setState({ show: true });
    }

    hide() {
        this.setState({ show: false });
    }

    render() {
        return (
            <>
                <Button variant="danger" onClick={this.show}>
                    Restart
                </Button>

                <Modal show={this.state.show} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Restart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to restart?</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.hide();
                                this.props.restart();
                            }}
                        >
                            Yes
                        </Button>
                        <Button variant="primary" onClick={this.hide}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Restart;
