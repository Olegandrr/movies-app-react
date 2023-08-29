/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Input } from 'antd'
import { Component } from 'react'
import debounce from 'lodash/debounce'

import './SearchFilms.css'

class SearchFilms extends Component {
  constructor(props) {
    super(props)
    this.state = { query: 'Афоня' }
  }

  handleKeyPress = debounce(() => {
    this.props.onSearch(this.state.query)
  }, 1500)

  handleInputChange = (event) => {
    this.setState({ query: event.target.value })
  }

  render() {
    return (
      <Input
        placeholder="Type to search..."
        type="text"
        value={this.state.query}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyPress}
      />
    )
  }
}

export default SearchFilms
