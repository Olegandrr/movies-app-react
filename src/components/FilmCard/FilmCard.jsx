import { Col, Row } from 'antd'
import { Component } from 'react'

import FilmGenre from '../FilmGenre'
import StarRating from '../StarRating'

import './FilmCard.css'

class FilmCard extends Component {
  constructor(props) {
    super(props)
    this.listColorForBorder = ['#E90000', '#E90000', '#E90000', '#E97E00', '#E97E00', '#E9D100', '#E9D100', '#66E900']
  }

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
    const color = this.listColorForBorder.slice(0, Math.floor(rating) + 1)
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
            {...{ xs: { span: 11, push: 6 }, sm: { span: 11, push: 6 }, md: { span: 11, push: 11 } }}
            className={title.length > 20 ? 'title-long_fonts' : ''}
          >
            {title}
          </Col>
          <Col
            {...{ xs: { span: 4, push: 10 }, sm: { span: 4, push: 10 }, md: { span: 2, push: 11 } }}
            style={{ border: `2px solid ${this.borderColor()}` }}
            className="rating"
          >
            {rating}
          </Col>
        </Row>
        <Row>
          <Col {...{ xs: { span: 18, push: 6 }, sm: { span: 18, push: 6 }, md: { span: 12, push: 11 } }}>
            <div className="date">{date}</div>
            <FilmGenre genre={genre} />
          </Col>
        </Row>
        <Row>
          <Col className="description" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12, push: 11 }}>
            <div>{this.cropDescription()}</div>
          </Col>
        </Row>
        <StarRating handelChangeStars={handelChangeStars} stars={stars} />
      </Col>
    )
  }
}

export default FilmCard
