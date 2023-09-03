import { Component } from 'react'
import { Spin, Pagination, Alert } from 'antd'

import './App.css'
import FilmsList from '../FilmsList'
import SearchFilms from '../SearchFilms'
import OnlineIndicator from '../OnlineIndicator'
import TMDBService from '../../services/TMDBService'
import { GenresFilmsProvider } from '../GenresFilmsContext'
import TabSwitch from '../TabSwitch'

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
    const { cards, loading, error, totalResults, ratedFilms, currentPage, genresFilms } = this.state
    const renderCondition = !loading && totalResults > 0
    return (
      <OnlineIndicator>
        <GenresFilmsProvider value={genresFilms}>
          <div className="wrapper">
            <TabSwitch handleClickRated={(e) => this.handleClickRated(e)}>
              <SearchFilms handleSearch={this.handleSearch} />
              {totalResults === 0 && <Alert className="error" message="Не найдено" type="info" />}
              {error && <Alert className="error" message="Сервер не отвечает" type="error" />}
              <Spin className="spiner" spinning={loading} size="large" />
              {renderCondition && (
                <FilmsList cards={cards} handelChangeStars={this.handelChangeStars} ratedFilms={ratedFilms} />
              )}
              {renderCondition && (
                <Pagination
                  className="paginator"
                  current={currentPage}
                  defaultCurrent={currentPage}
                  total={totalResults}
                  onChange={this.handlePageChange}
                  defaultPageSize={20}
                  showSizeChanger={false}
                />
              )}
            </TabSwitch>
          </div>
        </GenresFilmsProvider>
      </OnlineIndicator>
    )
  }
}

export default App
