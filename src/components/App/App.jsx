import { Component } from 'react'
import { Spin, Row, Pagination, Alert } from 'antd'

import './App.css'
import FilmsList from '../FilmsList'
import SearchFilms from '../SearchFilms'
import OnlineIndicator from '../OnlineIndicator'
import TMDBService from '../../services/TMDBService'
import { GenresFilmsProvider } from '../GenresFilmsContext'

class App extends Component {
  TMDBService = new TMDBService()

  state = {
    cards: [],
    loading: false,
    error: false,
    currentPage: 0,
    prevPage: 1,
    currentQuery: '',
    totalResults: null,
    guestSessionId: '',
    isRated: false,
    ratedFilms: new Map(),
    genresFilms: [],
  }

  componentDidMount() {
    this.TMDBService.createGuestSession()
      .then((gSess) => this.setState(() => ({ guestSessionId: gSess })))
      .then(this.getGenresFilms())
      .catch(this.onError)
  }

  componentDidUpdate(_prevProps, prevState) {
    const { isRated, prevPage, currentPage, currentQuery } = this.state
    if (prevState.isRated !== isRated) {
      if (isRated) {
        this.getRatedFilmsFromApi(currentPage)
      } else if (!isRated) {
        this.handleSearch(currentQuery, prevPage)
      }
    }
  }

  getGenresFilms = () => {
    this.TMDBService.getGenres()
      .then(({ genres }) => {
        this.setState({
          genresFilms: genres,
        })
      })
      .catch(this.onError)
  }

  handleSearch = (query, page) => {
    if (query.trim().length !== 0) {
      this.setState(() => ({
        prevPage: page,
        currentQuery: query,
        loading: true,
      }))
      this.TMDBService.getMovies(query, page)
        .then((data) => {
          this.onMoviesLoaded(data)
        })
        .catch(this.onError)
    }
  }

  getRatedFilmsFromApi = (page) => {
    const { guestSessionId } = this.state
    this.TMDBService.getRating(guestSessionId, page)
      .then((data) => this.onMoviesLoaded(data))
      .catch(this.onError)
  }

  onMoviesLoaded = (data) => {
    const { total_results: totalResults, results, page } = data
    if (totalResults === 0) {
      this.setState(() => ({
        cards: [],

        loading: false,
        totalResults: 0,
      }))
    } else {
      this.setState(() => ({
        cards: results,
        loading: false,
        error: false,
        totalResults,

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
    const { prevPage } = this.state
    const { name } = e.target
    if (name === 'Search') {
      this.setState(() => ({
        isRated: false,
        currentPage: prevPage,
        totalResults: null,
      }))
    } else if (name === 'Rated') {
      this.setState(() => ({
        isRated: true,
        currentPage: 1,
      }))
    }
  }

  handelChangeStars = (star, id) => {
    const { guestSessionId } = this.state
    this.TMDBService.addRating(id, guestSessionId, star)
      .then(() => {
        this.setState(({ ratedFilms }) => ({
          ratedFilms: new Map(ratedFilms.set(id, star)),
        }))
      })
      .catch(this.onError)
  }

  render() {
    const { cards, loading, error, totalResults, isRated, ratedFilms, currentPage, genresFilms } = this.state

    const renderCondition = !loading && totalResults > 0
    const selectedButton = 'button-tab button-tab__selected'
    return (
      <OnlineIndicator>
        <GenresFilmsProvider value={genresFilms}>
          <div className="wrapper">
            <Row justify="center">
              <button
                className={!isRated ? selectedButton : 'button-tab'}
                type="button"
                onClick={this.handleClickRated}
                name="Search"
              >
                Search
              </button>

              <button
                className={isRated ? selectedButton : 'button-tab'}
                type="button"
                onClick={this.handleClickRated}
                name="Rated"
              >
                Rated
              </button>
            </Row>
            <Row justify="center">{!isRated && <SearchFilms handleSearch={this.handleSearch} />}</Row>
            <Row justify="center">
              {totalResults === 0 && <Alert className="error" message="Поиск не дал результатов" type="info" />}
            </Row>
            <Row justify="center">{error && <Alert className="error" message="Сервер не отвечает" type="error" />}</Row>
            <Row justify="center">
              <Spin className="spiner" spinning={loading} size="large" />
            </Row>
            {renderCondition && (
              <FilmsList cards={cards} handelChangeStars={this.handelChangeStars} ratedFilms={ratedFilms} />
            )}
            <Row justify="center">
              {renderCondition && (
                <Pagination
                  current={currentPage}
                  defaultCurrent={currentPage}
                  total={totalResults}
                  onChange={this.handlePageChange}
                  defaultPageSize={20}
                  showSizeChanger={false}
                />
              )}
            </Row>
          </div>
        </GenresFilmsProvider>
      </OnlineIndicator>
    )
  }
}

export default App
