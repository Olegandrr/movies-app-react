/* eslint-disable react/destructuring-assignment */
import { Component } from 'react'
import { Col, Row, Pagination } from 'antd'

import './App.css'
import FilmsList from '../FilmsList'
import SearchFilms from '../SearchFilms'
import RatedFilter from '../RatedFilter'
import TMDBService from '../../services/TMDBService'

class App extends Component {
  TMDBService = new TMDBService()

  constructor(props) {
    super(props)
    this.state = { cards: [] }
  }

  handleSearch = (query) => {
    this.TMDBService.getMovies(query).then((data) => {
      this.setState({ cards: data.results })
    })
  }

  render() {
    console.log('Данные полученные с сервера', this.state)
    return (
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
          <Col span={24}>
            <SearchFilms onSearch={this.handleSearch} />
          </Col>
        </Row>

        <FilmsList cards={this.state.cards} />

        <Row justify="center">
          <Col span={12} offset={4}>
            <Pagination className="pagination" defaultCurrent={1} total={50} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
