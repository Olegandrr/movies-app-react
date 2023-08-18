/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Input } from 'antd'
import { Component } from 'react'

import './SearchFilms.css'

class SearchFilms extends Component {
  constructor(props) {
    super(props)
    this.state = { query: '' }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onSearch(this.state.query)
      this.setState({ query: '' })
    }
  }

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
