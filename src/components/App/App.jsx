/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import { Component } from 'react'
import { Spin, Col, Row, Pagination, Alert } from 'antd'

import './App.css'
import FilmsList from '../FilmsList'
import SearchFilms from '../SearchFilms'
import RatedFilter from '../RatedFilter'
import OnlineIndicator from '../OnlineIndicator'
import TMDBService from '../../services/TMDBService'

class App extends Component {
  TMDBService = new TMDBService()

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      loading: true,
    }
  }

  onMoviesLoaded = (data) => {
    this.setState({
      cards: data.results,
      loading: false,
      error: false,
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  handleSearch = (query) => {
    this.TMDBService.getMovies(query)
      .then((data) => {
        this.onMoviesLoaded(data)
      })
      .catch(this.onError)
  }

  render() {
    const { cards, loading, error } = this.state
    return (
      <OnlineIndicator>
        <div className="wrapper">
          <Row justify="center">
            <Col span={2} offset={1}>
              <p>Search</p>
            </Col>
            <Col span={2}>
              <RatedFilter />
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <SearchFilms onSearch={this.handleSearch} />
            </Col>
          </Row>
          {error && (
            <Alert
              className="error"
              message="The server is not responding, please refresh the page and try again later"
              type="error"
            />
          )}
          <Row justify="center">
            <Spin className="spiner" spinning={loading} size="large" />
          </Row>
          {!loading && <FilmsList cards={cards} />}
          <Row justify="center">
            <Col span={12} offset={4}>
              <Pagination defaultCurrent={1} total={50} />
            </Col>
          </Row>
        </div>
      </OnlineIndicator>
    )
  }
}

export default App
