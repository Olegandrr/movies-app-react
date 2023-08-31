/* eslint-disable camelcase */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
import { Component } from 'react'
import { Spin, Row, Pagination, Alert } from 'antd'

import './App.css'
import FilmsList from '../FilmsList'
import SearchFilms from '../SearchFilms'
import OnlineIndicator from '../OnlineIndicator'
import TMDBService from '../../services/TMDBService'

class App extends Component {
  TMDBService = new TMDBService()

  state = {
    cards: [],
    loading: false,
    error: false,
    currentPage: 0,
    prevPage: 1,
    currentQuery: '',
    totalResults: 0,
    noResults: false,
    guestSessionId: '',
    isRated: false,
    ratedFilms: new Map(),
  }

  componentDidMount() {
    console.log('didMount')
    this.TMDBService.createGuestSession()
      .then((gSess) => this.setState({ guestSessionId: gSess }))
      .catch((error) => console.log(error))
  }

  componentDidUpdate(_prevProps, prevState) {
    const { isRated, prevPage, currentPage } = this.state
    if (prevState.isRated !== isRated) {
      if (isRated) {
        this.getRatedFilmsFromApi(currentPage)
      } else if (!isRated) {
        this.setState(() => ({
          currentPage: prevPage,
        }))
      }
    }
  }

  onMoviesLoaded = (data) => {
    const { total_results, results, page } = data
    if (total_results === 0) {
      this.setState(() => ({
        cards: [],
        noResults: true,
        loading: false,
        totalResults: 0,
      }))
    } else {
      this.setState(() => ({
        cards: results,
        loading: false,
        error: false,
        totalResults: total_results,
        noResults: false,
        currentPage: page,
      }))
    }
  }

  onError = () => {
    this.setState(() => ({
      error: true,
      loading: false,
    }))
  }

  handleSearch = (query, page = 1) => {
    if (query.trim().length !== 0) {
      this.setState(() => ({
        prevPage: page,
        currentQuery: query,
        loading: true,
        noResults: false,
      }))
      this.TMDBService.getMovies(query, page)
        .then((data) => {
          this.onMoviesLoaded(data)
        })
        .catch(this.onError)
    }
  }

  handlePageChange = (page) => {
    const { currentQuery, isRated } = this.state
    this.setState(() => ({
      currentPage: page,
      loading: true,
    }))
    if (isRated) {
      this.getRatedFilmsFromApi(page)
    } else this.handleSearch(currentQuery, page)
  }

  handleClickRated = (e) => {
    const { currentQuery, prevPage } = this.state
    const { name } = e.target
    if (name === 'Search') {
      this.setState(() => ({
        isRated: false,
        currentPage: prevPage,
        noResults: false,
      }))
      this.handleSearch(currentQuery, prevPage)
    } else if (name === 'Rated') {
      this.setState(() => ({
        isRated: true,
        currentPage: 1,
      }))
    }
  }

  getRatedFilmsFromApi = (page) => {
    const { guestSessionId } = this.state
    this.TMDBService.getRating(guestSessionId, page).then((res) => this.onMoviesLoaded(res))
  }

  handelChangeStars = (star, id) => {
    const { guestSessionId } = this.state
    this.TMDBService.addRating(id, guestSessionId, star)
      .then(() => {
        this.setState(({ ratedFilms }) => ({
          ratedFilms: new Map(ratedFilms.set(id, star)),
        }))
      })
      .catch((error) => {
        console.log('Оценить не получилось', error)
      })
  }

  render() {
    const { cards, loading, error, totalResults, noResults, guestSessionId, isRated, ratedFilms, currentPage } =
      this.state
    return (
      <OnlineIndicator>
        <div className="wrapper">
          <Row justify="center">
            <button
              className={!isRated ? 'button-tab button-tab__selected' : 'button-tab'}
              type="button"
              onClick={this.handleClickRated}
              name="Search"
            >
              Search
            </button>

            <button
              className={isRated ? 'button-tab button-tab__selected' : 'button-tab'}
              type="button"
              onClick={this.handleClickRated}
              name="Rated"
            >
              Rated
            </button>
          </Row>
          <Row justify="center">{!isRated && <SearchFilms handleSearch={this.handleSearch} />}</Row>
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
          {!loading && totalResults > 0 && (
            <FilmsList
              cards={cards}
              guestSessionId={guestSessionId}
              isRated={isRated}
              handelChangeStars={this.handelChangeStars}
              ratedFilms={ratedFilms}
            />
          )}
          <Row justify="center">
            {totalResults > 0 && !loading ? (
              <Pagination
                current={currentPage}
                defaultCurrent={currentPage}
                total={totalResults}
                onChange={this.handlePageChange}
                defaultPageSize={20}
                showSizeChanger={false}
              />
            ) : null}
          </Row>
        </div>
      </OnlineIndicator>
    )
  }
}

export default App
