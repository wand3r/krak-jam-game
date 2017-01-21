import React, { Component } from "react"
import {currentUser} from '../../userProfile';
import {css} from "glamor"

export const Team = ({players}) => {
    return (
        <div {...css({display: "flex", flexDirection: "column"})}>
        {
            players.map(({name, acepted}) => {
                return (
                    <div {...css({
                        fontSize: "1.3em",
                        padding: "0.2em",
                        margin: "0.2em",
                        background: acepted ? "green" : "red"
                    })}>
                        <div {...css({
                            display: "flex", justifyContent: "center",
                        })}>
                            {name}
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}

export const WaitingPlayers = ({players}) => {
    return (
        <div {...css({display: "flex", flexWrap: true})}>
            {players.map(({name}) => 
                <div>
                    {name}
                </div>)}
        </div>
    )
}

export class Room extends Component {
  state = {
      players: [
          {name: "", team: "A"},
          {name: "", team: "B"},
          {name: "", team: "A"},
          {name: "", team: undefined},
          {name: "", team: "B"},
          {name: "", team: undefined},
          {name: "", team: "A"},
      ],

      red: {
        name: 'Red',
          players: [
              {name: 'Wojciech', id: '2'},
              {name: 'Rafik', id: '3'},
              {name: 'Maciej', id: '4'},
          ]
      },
      blue: {
        name: 'Blue',
          players: [
              {name: 'Wojciech', id: '5'},
              {name: 'Rafik', id: '6'},
              {name: 'Maciej', id: '7'},
              {name: 'Maciej', id: '7'},
          ]
      }
  };

  join(team, currentUser){
      this.setState({
          ...this.state,
          [team]: {
              ...this.state[team],
              players: [...this.state[team].players, currentUser]
          }
      })
  }

  render() {
    const { roomId } = this.props;
    return (
        <div {...css({display: "flex", flexDirection: "column"})}>
            <div {...css({display: "flex"})}>
                <div {...css({flex: 1})}>
                    <Team name={this.state.red.name} players={this.state.red.players}/>
                </div>
                <div {...css({
                    display: "flex", justifyContent: "center", alignItems: "center",
                    fontSize: "3em",
                })}>
                    VS
                </div>
                <div {...css({flex: 1})}>
                    <Team players={this.state.blue.players}/>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
  }
}