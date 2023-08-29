/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react'
import { Row } from 'antd'
import { format } from 'date-fns'

import FilmCard from '../FilmCard'
import './FilmsList.css'
import TMDBService from '../../services/TMDBService'

class FilmsList extends Component {
  TMDBService = new TMDBService()

  state = {
    resultsGetRating: [],
  }

  componentDidMount() {
    const { guestSessionId } = this.props
    this.TMDBService.getRating(guestSessionId)
      .then((res) => this.setState({ resultsGetRating: res }))
      .then(console.log('это стейт фильмлиста, после маунт', this.state.resultsGetRating))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isRated !== this.props.isRated) {
      const { guestSessionId } = this.props
      this.TMDBService.getRating(guestSessionId).then((res) => this.setState({ resultsGetRating: res }))
    }
  }

  ratingGuestSession = (id) => {
    const { resultsGetRating } = this.state
    const ratedFilm = resultsGetRating.filter((elem) => elem.id === id)
    return ratedFilm.length > 0 ? ratedFilm[0].rating : 0
  }

  render() {
    const { cards, guestSessionId, isRated } = this.props
    const { resultsGetRating } = this.state
    const newList = isRated ? resultsGetRating : cards
    console.log('это стейт фильмлиста, в ренедер: ', this.state.resultsGetRating)
    return (
      <div className="filmsListWrapper">
        <Row className="row" gutter={[0, 32]} justify="space-between">
          {newList.map((item) => (
            <FilmCard
              stars={resultsGetRating.length > 0 ? this.ratingGuestSession(item.id) : 0}
              key={item.id}
              id={item.id}
              guestSessionId={guestSessionId}
              title={item.title}
              description={item.overview}
              date={item.release_date ? format(new Date(item.release_date), 'MMMM d, yyyy') : 'No release date'}
              genre="Drama"
              rating={item.vote_average.toFixed(1)}
              img={item.poster_path}
            />
          ))}
        </Row>
      </div>
    )
  }
}

export default FilmsList
