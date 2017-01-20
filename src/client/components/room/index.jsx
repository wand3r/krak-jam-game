import React, { Component } from "react"
import {Team} from "../team";
import {currentUser} from '../../userProfile';

export class Room extends Component {
  state = {
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
      <div>
        <div>
           <Team name={this.state.red.name} players={this.state.red.players}/>
            <div>
                <button onClick={() => this.join('red',currentUser)}>Sit</button>
            </div>
        </div>
          <div>
            <Team name={this.state.blue.name} players={this.state.blue.players}/>
            <div>
                <button onClick={() => this.join('blue',currentUser)}>Sit</button>
            </div>
          </div>
      </div>
    )
  }
}