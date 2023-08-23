/* eslint-disable no-alert */
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

  state = {
    cards: [],
    loading: false,
    error: false,
    currentPage: 1,
    currentQuery: '',
    totalResults: 0,
    noResults: false,
  }

  onMoviesLoaded = (data) => {
    if (data.total_results === 0) {
      this.setState({
        cards: [],
        noResults: true,
        loading: false,
        totalResults: 0,
      })
    } else {
      this.setState({
        cards: data.results,
        loading: false,
        error: false,
        totalResults: data.total_results,
        noResults: false,
      })
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  handleSearch = (query, page = 1) => {
    if (query.trim().length !== 0) {
      this.setState({
        currentQuery: query,
        loading: true,
        noResults: false,
      })
      this.TMDBService.getMovies(query, page)
        .then((data) => {
          this.onMoviesLoaded(data)
        })
        .catch(this.onError)
    }
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
    const { cards, loading, error, totalResults, noResults } = this.state
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
            <Alert
              className={noResults ? 'error' : 'results'}
              message="Поиск не дал результатов"
              type="info"
              showIcon
            />
          </Row>
          <Row justify="center">
            {error && (
              <Alert
                className="error"
                message="Сервер не отвечает, обновите страницу и повторите попытку"
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
