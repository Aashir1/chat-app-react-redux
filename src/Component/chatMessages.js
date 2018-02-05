import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
    radioButton: {
        marginTop: 16,
    },
};

/**
 * Dialog content can be scrollable.
 */
export default class DialogExampleScrollable extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        const radios = [];
        for (let i = 0; i < 30; i++) {
            radios.push(
                <RadioButton
                    key={i}
                    value={`value${i + 1}`}
                    label={`Option ${i + 1}`}
                    style={styles.radioButton}
                />
            );
        }

        return (
            <div>
                <Dialog
                    title={`Chat with ${this.props.withChat}`}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div>
                        {
                            this.props.conversations ?
                                this.props.chatMessages.map(eachObj => {
                                    return (
                                        <div>
                                            <Chip
                                                onRequestDelete={handleRequestDelete}
                                                onClick={handleClick}
                                                style={styles.chip}
                                            >
                                                Deletable Text Chip
                                            </Chip>
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}



