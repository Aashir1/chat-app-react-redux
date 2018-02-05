import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ErrorAlert extends React.Component {

//   state = {
//     open: false,
//   };

//   handleOpen = () => {
//     this.setState({open: true});
//   };

//   handleClose = () => {
//     this.setState({open: false});
//   };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleClose}
      />
    ];

    return (
      <div>
        {/* <RaisedButton label="Dialog" onClick={this.handleOpen} /> */}
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          {this.props.errorText}
        </Dialog>
      </div>
    );
  }
}