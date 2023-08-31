import { Input } from 'antd'
import { Component } from 'react'
import debounce from 'lodash/debounce'

import './SearchFilms.css'

class SearchFilms extends Component {
  state = { query: '' }

  handleKeyPress = debounce(() => {
    const { handleSearch } = this.props
    const { query } = this.state
    handleSearch(query, 1)
  }, 1500)

  handleInputChange = (event) => {
    this.setState({ query: event.target.value })
  }

  render() {
    const { query } = this.state
    return (
      <Input
        placeholder="Type to search..."
        type="text"
        value={query}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyPress}
      />
    )
  }
}

export default SearchFilms
