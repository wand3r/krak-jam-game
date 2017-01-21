import React, { Component } from "react"
import {currentUser} from '../../userProfile';
import {css} from "glamor"
import * as R from 'ramda'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export const Player = ({name, state}) => {
    return (
        <div {...css({
            fontSize: "1.3em",
            padding: "0.2em",
            margin: "0.2em",
            background: state === "ready" ? "green" : 
                state === "notready" ? "red" : 
                state === "waiting" ? "gray" :
                undefined,
        })}>
            <div {...css({
                display: "flex", justifyContent: "center",
            })}>
                {name}
            </div>
        </div>
    )
}

export const Team = ({teamId, players, join}) => {
    return (
        <div {...css({display: "flex", flexDirection: "column"})}>
            <div {...css({display: "flex", justifyContent: "center", margin: "0.5em"})}>
                <FloatingActionButton mini={true} onClick={() => join(teamId)}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
            {players.map(({name, ready}, index) => {
                return (
                    <Player 
                        name={name}
                        state={ready ? "ready" : "notready"} 
                    />
                )
            })}
        </div>
    )
}

export const Teams = ({teams, joinTeam}) => {
    const lastTeam = R.last(R.keys(teams)) 
    return (
        <div {...css({display: "flex"})}>
            {R.pipe(
                R.mapObjIndexed((players, team) => [
                    <div {...css({flex: 1})}> 
                        <Team 
                            key={team} 
                            teamId={team} 
                            players={players}
                            join={joinTeam} 
                        />
                    </div>,
                    team !== lastTeam && 
                    <div {...css({fontSize: "2em", display: "flex", alignItems: "center"})}>
                        VS
                    </div>]), 
                R.values)(teams)}
        </div>
    )
}

export const WaitingPlayers = ({players}) => {
    return (
        <div>
            <h3>Waiting...</h3>
            <div {...css({display: "flex", flexWrap: true})}>
                {players.map(({name}) => 
                    <Player name={name} state="waiting" />
                )}
            </div>
        </div>
    )
}

export class Room extends Component {
  state = {
      players: [
          {name: "Player 1", team: "A", ready: true},
          {name: "Player 2", team: "B", ready: false},
          {name: "Player 3", team: "A", ready: true },
          {name: "Player 4", team: undefined},
          {name: "Player 5", team: "A", ready: false},
          {name: "Player 6", team: undefined},
          {name: "Player 7", team: "B", ready: true},
      ]
  };
  render() {
    const userId = currentUser.id;
    const { roomId, joinTeam } = this.props;
    const { players } = this.state;
    const teams = R.pipe(
        R.filter(x => x.team !== undefined),
        R.groupBy(x => x.team)
    )(players)
    const lastTeam = R.last(R.keys(teams))
    const waitingPlayers = 
        players.filter(x => x.team === undefined)
    console.log(teams)
    return (
        <div {...css({display: "flex", flexDirection: "column"})}>
            <Teams teams={teams} joinTeam={(teamId) => joinTeam(userId, roomId, teamId)} />
            <WaitingPlayers players={waitingPlayers} />
            <div>
                <button>Ready</button>
                <button>Leave</button>
            </div>
        </div>
    )
  }
}