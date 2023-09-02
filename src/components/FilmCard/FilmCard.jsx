import { Col, Row, Rate } from 'antd'
import { Component } from 'react'

import FilmGenre from '../FilmGenre'

import './FilmCard.css'

class FilmCard extends Component {
  cropDescription = () => {
    const { description } = this.props
    if (description.length > 200) {
      const descTotal = description.substr(0, 200)
      return `${descTotal.substr(0, descTotal.lastIndexOf(' '))} ...`
    }
    return description
  }

  borderColor = () => {
    const { rating } = this.props
    const color = ['#E90000', '#E90000', '#E90000', '#E97E00', '#E97E00', '#E9D100', '#E9D100', '#66E900'].slice(
      0,
      Math.floor(rating) + 1
    )
    return color[color.length - 1]
  }

  render() {
    const { title, date, genre, rating, img, stars, handelChangeStars } = this.props
    return (
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} className="card">
        <div>
          <img
            className="films-poster-img"
            src={
              img !== null
                ? `https://image.tmdb.org/t/p/original${img}`
                : 'https://gdr.one/simg/183x281/5094bd/fff?text=No_image'
            }
            alt={title}
          />
        </div>

        <Row className="title-rating__size">
          <Col
            className={title.length > 20 ? 'title-long_fonts' : ''}
            xs={{ span: 11, push: 6 }}
            sm={{ span: 18, push: 6 }}
            md={{ span: 11, push: 11 }}
          >
            {title}
          </Col>
          <Col
            style={{ border: `2px solid ${this.borderColor()}` }}
            className="rating"
            xs={{ span: 4, push: 10 }}
            sm={{ span: 4, push: 10 }}
            md={{ span: 2, push: 11 }}
          >
            {rating}
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 18, push: 6 }} sm={{ span: 18, push: 6 }} md={{ span: 12, push: 11 }}>
            <div className="date">{date}</div>
            <FilmGenre genre={genre} />
          </Col>
        </Row>
        <Row>
          <Col className="description" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, push: 11 }}>
            <div>{this.cropDescription()}</div>
          </Col>
        </Row>
        <Row className="stars-wrapper" align="bottom">
          <Col xs={{ span: 17, push: 6 }} sm={{ span: 17 }} md={{ span: 13, push: 11 }}>
            <Rate
              className="star__size "
              count={10}
              allowHalf
              onChange={handelChangeStars}
              value={stars}
              allowClear={false}
            />
          </Col>
        </Row>
      </Col>
    )
  }
}

export default FilmCard
