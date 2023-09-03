/* eslint-disable react/jsx-fragments */
import { Component, Fragment } from 'react'
import { Row } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import './TabSwitch.css'

class TabSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSearch: true,
      selectedRated: false,
    }
    this.selectedButton = 'button-tab button-tab__selected'
    this.button = [{ name: 'Search' }, { name: 'Rated' }]
  }

  handleClickButton = (e) => {
    const { selectedSearch, selectedRated } = this.state
    const { handleClickRated } = this.props
    const { name } = e.target
    if (name === 'Search' && !selectedSearch) {
      this.setState((prevState) => ({
        selectedSearch: !prevState.selectedSearch,
        selectedRated: !prevState.selectedRated,
      }))
      handleClickRated(e)
    } else if (name === 'Rated' && !selectedRated) {
      this.setState((prevState) => ({
        selectedSearch: !prevState.selectedSearch,
        selectedRated: !prevState.selectedRated,
      }))
      handleClickRated(e)
    }
  }

  selectedClassName = (name) => {
    const { selectedSearch, selectedRated } = this.state
    if (name === 'Search' && selectedSearch) {
      return this.selectedButton
    }
    if (name === 'Rated' && selectedRated) {
      return this.selectedButton
    }
    return 'button-tab'
  }

  render() {
    const { children } = this.props
    const { selectedRated } = this.state
    return (
      <Fragment>
        <Row justify="center">
          {this.button.map((item) => (
            <button
              key={uuidv4()}
              name={item.name}
              className={this.selectedClassName(item.name)}
              onClick={this.handleClickButton}
              type="button"
            >
              {item.name}
            </button>
          ))}
        </Row>
        {selectedRated ? children.slice(1) : children}
      </Fragment>
    )
  }
}

export default TabSwitch
