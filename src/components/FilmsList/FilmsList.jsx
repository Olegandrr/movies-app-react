/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react'
import { Row } from 'antd'

import FilmCard from '../FilmCard'

import './FilmsList.css'

const data = [
  {
    id: 1,
    title: 'Return',
    description: 'Back from a tour of duty, Kelli struggles to find her place',
    date: '2011-02-10',
    genre: 'drama',
    rating: '6.5',
  },
  {
    id: 1,
    title: 'Return',
    description: 'Back from a tour of duty, Kelli struggles to find her place',
    date: '2011-02-10',
    genre: 'drama',
    rating: '6.5',
  },
  {
    id: 1,
    title: 'Return',
    description: 'Back from a tour of duty, Kelli struggles to find her place',
    date: '2011-02-10',
    genre: 'drama',
    rating: '6.5',
  },
  {
    id: 1,
    title: 'Return',
    description: 'Back from a tour of duty, Kelli struggles to find her place',
    date: '2011-02-10',
    genre: 'drama',
    rating: '6.5',
  },
  {
    id: 1,
    title: 'Return',
    description: 'Back from a tour of duty, Kelli struggles to find her place',
    date: '2011-02-10',
    genre: 'drama',
    rating: '6.5',
  },
  {
    id: 1,
    title: 'Return',
    description: 'Back from a tour of duty, Kelli struggles to find her place',
    date: '2011-02-10',
    genre: 'drama',
    rating: '6.5',
  },
]
class FilmsList extends Component {
  render() {
    return (
      <div className="filmsListWrapper">
        <Row className="row" gutter={[0, 32]} justify="space-between">
          {data.map((item) => (
            <FilmCard
              key={item.id}
              title={item.title}
              description={item.description}
              date={item.date}
              genre={item.genre}
              rating={item.rating}
              img={item.img}
            />
          ))}
        </Row>
      </div>
    )
  }
}

export default FilmsList
