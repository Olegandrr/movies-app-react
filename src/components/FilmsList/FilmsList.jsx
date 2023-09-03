import { Row } from 'antd'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import FilmCard from '../FilmCard'
import './FilmsList.css'

function FilmsList({ cards, handelChangeStars, ratedFilms }) {
  return (
    <div className="film-list-wrapper">
      <Row className="row" gutter={[0, 32]} justify="space-between">
        {cards.map((item) => (
          <FilmCard
            stars={ratedFilms.get(item.id) || 0}
            key={item.id}
            title={item.title}
            description={item.overview}
            date={item.release_date ? format(new Date(item.release_date), 'MMMM d, yyyy') : 'No release date'}
            genre={item.genre_ids}
            rating={item.vote_average.toFixed(1)}
            img={item.poster_path}
            handelChangeStars={(star) => handelChangeStars(star, item.id)}
          />
        ))}
      </Row>
    </div>
  )
}

FilmsList.defaultProps = {
  cards: [],
  ratedFilms: new Map(),
}

FilmsList.propTypes = {
  cards: PropTypes.instanceOf(Array),
  ratedFilms: PropTypes.instanceOf(Map),
  handelChangeStars: PropTypes.func.isRequired,
}

export default FilmsList
