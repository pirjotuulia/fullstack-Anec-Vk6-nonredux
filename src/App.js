import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification';
import { NavLink } from 'react-router-dom'
import './index.css'
import { Container, Table, Grid, Image, Menu } from 'semantic-ui-react';

const menuActiveStyle = {
  fontWeight: 'bold',
  color: 'blue',
  background: 'lavender',
  padding: '10px'
}
const Navigation = () => (
  <Menu>
    <Menu.Item link>
      <NavLink className="menuitem" exact to="/" activeStyle={menuActiveStyle}>Anecdotes</NavLink>
    </Menu.Item>
    <Menu.Item link>
      <NavLink className="menuitem" exact to="/create" activeStyle={menuActiveStyle}>Create new</NavLink>
    </Menu.Item>
    <Menu.Item link>
      <NavLink className="menuitem" exact to="/about" activeStyle={menuActiveStyle}>About</NavLink>
    </Menu.Item>
  </Menu>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <Grid>
      <Grid.Column width={12}>
        <p>According to Wikipedia:</p>
        <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column width={4}>
        <Image src='https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg' />
      </Grid.Column>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new anecdote ${anecdote.content} added` })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const naytetaanIlmoitus =
      this.state.notification ?
        <Notification message={this.state.notification} /> : <div></div>
    return (
      // <div className="container">
      <Container>
        <div>
          <Router>
            <div>
              <h1>Software Anecdotes</h1>
              <div>
                <Navigation />
              </div>
              {naytetaanIlmoitus}
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
              <Route path="/anecdotes/:id" render={({ match }) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
              <Route path="/about" render={() => <About />} />
              {/* <Route path="/users" render={() => <Users />} /> */}
              <div>
                <Footer />
              </div>
            </div>
          </Router>
        </div >
      </Container>
      // </div >
    )
  }
}


export default App;
