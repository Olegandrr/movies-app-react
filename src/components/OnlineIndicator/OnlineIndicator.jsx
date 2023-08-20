import { Component } from 'react'
import { Alert } from 'antd'

import './OnlineIndicator.css'

class OnlineIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: true,
    }
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline)
    window.addEventListener('offline', this.handleOffline)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOffline)
  }

  handleOnline = () => {
    this.setState({ isConnected: true })
  }

  handleOffline = () => {
    this.setState({ isConnected: false })
  }

  render() {
    const { isConnected } = this.state
    const { children } = this.props

    return (
      <div>
        {isConnected ? children : <Alert className="offline" message="There is no internet connection" type="error" />}
      </div>
    )
  }
}
export default OnlineIndicator
