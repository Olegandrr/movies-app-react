import { Col, Row, Pagination } from 'antd'

import './App.css'
import FilmsList from '../FilmsList'
import SearchFilms from '../SearchFilms'
import RatedFilter from '../RatedFilter'

function App() {
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
          <SearchFilms />
        </Col>
      </Row>

      <FilmsList />

      <Row justify="center">
        <Col span={12} offset={4}>
          <Pagination className="pagination" defaultCurrent={1} total={50} />
        </Col>
      </Row>
    </div>
  )
}

export default App
