import React, {Component} from "react";
import {css} from 'glamor';
import {Rooms} from '../rooms';
import {Room} from '../room';
import {Questions} from '../questions';
import {LoginScreen} from '../login-screen';
import {initializeConnection, getConnection} from '../../../lefrex-js/connection-provider';
import {initialize as initializeActionProcessor} from '../../../lefrex-js/action-processor';
import {initialize as initializeEventAggregator} from '../../../lefrex-js/event-aggregator';

const steps = {
    rooms: {
        component: <Rooms />
    },
    room: {
        component: <Room />
    },
    questions: {
        component: <Questions />
    },
    login: {
        component: <LoginScreen/>
    }
};

export class Main extends Component {
    state = {
        user: undefined,
        connected: false,
        step: "login",
        roomId: undefined,
    };

    componentDidMount() {
        initializeConnection()
            .then(x => {
                initializeActionProcessor(getConnection());
                initializeEventAggregator(getConnection());
                this.setState({connected: true})
            })
            .catch(x => {
                throw new Error(x)
            })
    };
    successfulLogIn = (user) => {
        this.setState({user, step: "rooms"})
    }
    goToRoom = (roomId) => {
        console.log("Go to room %O", roomId)
        this.setState({step: "room", roomId})
    }
    render() {
        const {step, user, roomId, connected} = this.state;
        return (
            <div {...css({padding: "2em"})}>
                {connected &&
                <div {...css({height: "100%", display: "flex"})}>
                    {step === "login" ? <LoginScreen onSuccessfulLogIn={this.successfulLogIn}/> :
                     step === "rooms" ? <Rooms user={user} goToRoom={this.goToRoom} /> :
                     step === "room"  ? <Room roomId={roomId} userId={user.id}/> :
                     step === "questions" ? <Questions /> :
                     undefined}
                </div>
                }
            </div>
        )
    }
}