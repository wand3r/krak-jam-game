import React, {Component} from 'react';
import {TextField, RaisedButton, Card, Dialog, FlatButton} from 'material-ui';
import {css} from "glamor";
import {processAction} from "../../../lefrex-js/action-processor";
import {createUserLoginAction} from "../../../domain/user/actions";

export class LoginScreenView extends Component {
    state = {
        loginFieldValue: ''
    };

    render() {
        const {onLogIn, validationMessage, canceled} = this.props;
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this.setState({loginFieldValue: ''}); canceled();}}
            />
        ];
        return (
            <div {...css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#EEE',
                padding: '12px',
                filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.5))'
            })}>
                <Card style={{padding: '18px', margin: '10px', color: '#444'}}>
                    <span>You have to be logged in to play the game!</span>
                </Card>
                <TextField onChange={({target:{value}}) => this.setState({loginFieldValue: value})}
                           hintText="Type your login" value={this.state.loginFieldValue} style={{margin: '10px'}}/>
                <br/>
                <RaisedButton onClick={() => onLogIn(this.state.loginFieldValue)} label="Login" primary={true}/>
                <Dialog
                    title={validationMessage}
                    modal={true}
                    open={validationMessage !== undefined}
                    onRequestClose={this.close}
                    actions={actions}
                >
                    Click OK button and try to login one more time.
                </Dialog>
            </div>
        );
    }
}

export class LoginScreen extends Component {
    logIn = (userName) => {
        processAction(createUserLoginAction(userName))
        .then(user => {
            this.props.onSuccessfulLogIn(user);
        }).catch((err) => {
            this.setState({validationMessage: err.message});
        });
    };
    repeatLogin = () => {
        this.setState({validationMessage: undefined});
    };
    state = {
        validationMessage: undefined
    };

    render() {
        const {validationMessage} = this.state;
        return (
            <LoginScreenView 
                canceled={this.repeatLogin} 
                validationMessage={validationMessage}
                onLogIn={this.logIn}
            />
        )
    }
}