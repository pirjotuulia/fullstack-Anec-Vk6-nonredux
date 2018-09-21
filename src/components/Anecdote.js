import React from 'react'

class Anecdote extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.anecdote.content} by {this.props.anecdote.author}</h2>
                <p>has {this.props.anecdote.votes} votes</p>
                <p>for more info see <a href={this.props.anecdote.info}>{this.props.anecdote.info}</a></p>
            </div>
        )
    }

}

export default Anecdote