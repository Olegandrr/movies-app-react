/* eslint-disable react/destructuring-assignment */
import { Component } from 'react'
import { Rate } from 'antd'

import TMDBService from '../../services/TMDBService'
import './StarRating.css'

class StarRating extends Component {
  TMDBService = new TMDBService()

  state = {
    choiceStar: this.props.stars,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stars !== this.props.stars) {
      this.setState({ choiceStar: this.props.stars })
    }
  }

  handelChangeStars = (star) => {
    const { id, guestSessionId } = this.props
    this.TMDBService.addRating(id, guestSessionId, star).then((x) =>
      x.success
        ? this.setState({ choiceStar: star })
        : new Error('Оценить не получилось').catch((e) => console.log('Оценить не получилось', e))
    )
  }

  render() {
    const { choiceStar } = this.state
    return (
      <Rate
        className="star__size "
        count={10}
        allowHalf
        onChange={this.handelChangeStars}
        value={choiceStar}
        allowClear={false}
      />
    )
  }
}

export default StarRating
