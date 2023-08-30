/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react'
import { Row } from 'antd'
import { format } from 'date-fns'

import FilmCard from '../FilmCard'
import './FilmsList.css'

class FilmsList extends Component {
  render() {
    const { cards, guestSessionId, handelChangeStars, ratedFilms } = this.props
    console.log(this.props)
    return (
      <div className="filmsListWrapper">
        <Row className="row" gutter={[0, 32]} justify="space-between">
          {cards.map((item) => (
            <FilmCard
              stars={ratedFilms.get(item.id) || 0}
              key={item.id}
              id={item.id}
              guestSessionId={guestSessionId}
              title={item.title}
              description={item.overview}
              date={item.release_date ? format(new Date(item.release_date), 'MMMM d, yyyy') : 'No release date'}
              genre="Drama"
              rating={item.vote_average.toFixed(1)}
              img={item.poster_path}
              handelChangeStars={(star) => handelChangeStars(star, item.id)}
            />
          ))}
        </Row>
      </div>
    )
  }
}

export default FilmsList
