import React, { Component } from "react"
import {currentUser} from '../../userProfile';
import {css} from "glamor"
import * as R from 'ramda'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export const Player = ({name, isCurrent, isReady, hasTeam}) => {
    return (
        <div {...css({
            fontSize: "1.3em",
            padding: "0.2em",
            margin: "0.2em",
            border: isCurrent ? "black 5px solid" : undefined,
            background: 
                isReady ? "green" : 
                hasTeam ? "red" : 
                "gray",
        })}>
            <div {...css({
                display: "flex", justifyContent: "center",
            })}>
                {name}
            </div>
        </div>
    )
}

export const Team = ({currentUser, teamId, players, join}) => {
    const canCurrentUserJoinTeam = !currentUser.isReady && currentUser.teamId !== teamId
    return (
        <div {...css({display: "flex", flexDirection: "column"})}>
            <div {...css({display: "flex", justifyContent: "center", margin: "0.5em"})}>
                <FloatingActionButton 
                    disabled={!canCurrentUserJoinTeam} 
                    mini={true} 
                    onClick={() => join(teamId)
                }>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
            {players.map(({id, name, isReady, teamId}) =>
                <Player 
                    key={id}
                    name={name}
                    isReady={isReady}
                    isCurrent={currentUser.id === id}
                    hasTeam={teamId !== id} 
                /> 
            )}
        </div>
    )
}

export const Teams = ({currentUser, teams, joinTeam}) => {
    const lastTeam = R.last(R.keys(teams)) 
    return (
        <div {...css({display: "flex"})}>
            {R.pipe(
                R.mapObjIndexed((players, teamId) => [
                    <div key={teamId} {...css({flex: 1})}> 
                        <Team 
                            key={teamId} 
                            currentUser={currentUser}
                            teamId={teamId} 
                            players={players}
                            join={joinTeam} 
                        />
                    </div>,
                    teamId !== lastTeam && 
                    <div {...css({fontSize: "2em", display: "flex", alignItems: "center"})}>
                        VS
                    </div>]), 
                R.values)(teams)}
        </div>
    )
}

export const WaitingPlayers = ({currentUserId, players}) => {
    return (
        <div>
            <h3>Waiting...</h3>
            <div {...css({display: "flex", flexWrap: true})}>
                {players.map(({id, name, isReady, teamId}) => 
                    <Player 
                        key={id} 
                        isCurrent={currentUserId === id} 
                        name={name} 
                        isReady={isReady} 
                        hasTeam={teamId !== undefined}
                    />
                )}
            </div>
        </div>
    )
}

export const RoomView = ({ 
    currentUserId, 
    roomId, 
    players, 
    leaveRoom, 
    getReady, 
    joinTeam, 
}) => {
    
    const currentUser = players.find(x => x.id === currentUserId)

    const teams = R.pipe(
        R.filter(({teamId}) => teamId !== undefined),
        R.groupBy(x => x.teamId),
    )(players)

    const waitingPlayers = 
        players.filter(({teamId}) => teamId === undefined)

    return (
        <div {...css({display: "flex", flexDirection: "column"})}>
            <Teams
                currentUser={currentUser}
                teams={teams} 
                joinTeam={teamId => joinTeam(currentUser.id, roomId, teamId)} 
            />
            <WaitingPlayers 
                currentUserId={currentUser.id}
                players={waitingPlayers} 
            />
            <div>
                <button 
                    disabled={currentUser.teamId == undefined || currentUser.isReady} 
                    onClick={() => getReady(currentUser.id, roomId)}
                >
                    Ready
                </button>
                <button onClick={() => leaveRoom(currentUser.id, roomId)}>
                    Leave
                </button>
            </div>
        </div>
    )
}

export class Room extends Component {
    state = {
        roomId: 1,
        currentUserId: currentUser.id,
        players: [
          {id: '1', name: "Player 1", teamId: undefined, isReady: false},
          {id: '2', name: "Player 2", teamId: "B", isReady: false},
          {id: '3', name: "Player 3", teamId: "A", isReady: true },
          {id: '4', name: "Player 4", teamId: undefined},
          {id: '5', name: "Player 5", teamId: "A", isReady: false},
          {id: '6', name: "Player 6", teamId: undefined},
          {id: '7', name: "Player 7", teamId: "B", isReady: true},
        ]
    }
    updateUser = (userId, wholeState, oldUserState) => ({
        ...wholeState,
        players: [
            ...wholeState.players.filter(x => x.id !== userId),
            { ...wholeState.players.find(x => x.id === userId), ...oldUserState}
        ]
    })
    leaveRoom = (userId, roomId) => {

    }
    getReady = (userId, roomId) => {
        this.setState(s => this.updateUser(userId, s, { isReady: true }));
    }
    joinTeam = (userId, roomId, teamId) => {
        this.setState(s => this.updateUser(userId, s, { teamId }))
    }
    componentDidMount() {

    }
    render() {
        const { roomId, currentUserId, players } = this.state
        return (
            <RoomView 
                roomId={roomId} 
                currentUserId={currentUserId}
                players={players}
                leaveRoom={this.leaveRoom} 
                getReady={this.getReady}
                joinTeam={this.joinTeam} 
            />
        )
    }
}