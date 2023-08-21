/* eslint-disable react/no-unused-state */
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
      error: false,
      currentPage: 1,
      currentQuery: '',
      totalResults: 0,
    }
  }

  onMoviesLoaded = (data) => {
    this.setState({
      cards: data.results,
      loading: data.total_results === 0,
      error: false,
      totalResults: data.total_results,
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  handleSearch = (query, page = 1) => {
    this.setState({
      currentQuery: query,
    })
    this.TMDBService.getMovies(query, page)
      .then((data) => {
        this.onMoviesLoaded(data)
      })
      .catch(this.onError)
  }

  handlePageChange = (page) => {
    const { currentQuery } = this.state
    this.setState(() => ({
      currentPage: page,
      loading: true,
    }))
    this.handleSearch(currentQuery, page)
  }

  render() {
    const { cards, loading, error, totalResults } = this.state
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
            <SearchFilms onSearch={this.handleSearch} />
          </Row>
          <Row justify="center">
            {error && (
              <Alert
                className="error"
                message="The server is not responding, please refresh the page and try again later"
                type="error"
              />
            )}
          </Row>
          <Row justify="center">
            <Spin className="spiner" spinning={loading} size="large" />
          </Row>
          {!loading && <FilmsList cards={cards} />}
          <Row justify="center">
            {totalResults > 0 && (
              <Pagination
                defaultCurrent={1}
                total={totalResults}
                onChange={this.handlePageChange}
                defaultPageSize={20}
                showSizeChanger={false}
              />
            )}
          </Row>
        </div>
      </OnlineIndicator>
    )
  }
}

export default App
