/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react'
import { Row } from 'antd'

import FilmCard from '../FilmCard'

import './FilmsList.css'

class FilmsList extends Component {
  render() {
    const { cards } = this.props
    console.log('Данные из пропсов листа фильмов', cards)
    return (
      <div className="filmsListWrapper">
        <Row className="row" gutter={[0, 32]} justify="space-between">
          {cards.map((item) => (
            <FilmCard
              key={item.id}
              title={item.title}
              description={item.overview}
              date={item.release_date}
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
