import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { GenresFilmsConsumer } from '../GenresFilmsContext'

import './FilmGenre.css'

class FilmGenre extends Component {
  genreGenerator = (genresFilms) => {
    const { genre } = this.props
    const genreIdList = genresFilms.filter((item) => genre.includes(item.id))
    const genreNameList = genreIdList.map((item) => item.name)
    const total = genreNameList.map((item) => (
      <div className="genre" key={uuidv4()}>
        {item}
      </div>
    ))
    return total.length !== 0 ? (
      total
    ) : (
      <div className="genre" key={uuidv4()}>
        Genre is not defined
      </div>
    )
  }

  render() {
    return (
      <GenresFilmsConsumer>
        {(genresFilms) => <div className="genre-wrapper">{this.genreGenerator(genresFilms)}</div>}
      </GenresFilmsConsumer>
    )
  }
}

export default FilmGenre
