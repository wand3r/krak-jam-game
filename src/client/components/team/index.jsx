import React, { Component } from 'react'

export function Team(props)
{
    return (
        <div>
            <h1>{props.name}</h1>
            <div>
                <div>Members</div>
                <div>
                    {
                        props.players.map(player => {
                            return <div>{player.name}</div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
