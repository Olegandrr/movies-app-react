import { Row, Col, Rate } from 'antd'
import PropTypes from 'prop-types'
import './StarRating.css'

function StarRating({ handelChangeStars, stars }) {
  return (
    <Row className="stars-wrapper" align="bottom">
      <Col xs={{ span: 18, push: 6 }} sm={{ span: 17, push: 6 }} md={{ span: 13, push: 11 }}>
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
  )
}

StarRating.defaultProps = {
  stars: 0,
}

StarRating.propTypes = {
  stars: PropTypes.number,
}

export default StarRating
