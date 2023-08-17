/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react'
import { Row, Col } from 'antd'

import TMDBService from '../../services/TMDBService'
import FilmCard from '../FilmCard'

import './FilmsList.css'

class FilmsList extends Component {
  TMDBService = new TMDBService()

  constructor() {
    super()
    this.state = {
      movies: null,
    }
  }

  updateMovies() {
    this.TMDBService.getMovies('war').then((mov) => {
      console.log(mov)
    })
  }

  render() {
    return (
      <div className="filmsListWrapper">
        <Row className="row" justify="center" gutter={[36, 36]}>
          <Col span={12}>
            <FilmCard />
          </Col>
          <Col span={12}>
            <FilmCard />
          </Col>
          <Col span={12}>
            <FilmCard />
          </Col>
          <Col span={12}>
            <FilmCard />
          </Col>
          <Col span={12}>
            <FilmCard />
          </Col>
          <Col span={12}>
            <FilmCard />
          </Col>
        </Row>
      </div>
    )
  }
}

export default FilmsList
