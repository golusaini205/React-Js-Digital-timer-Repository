import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitsInMinutes: 25,
  timerElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitsInMinutes} = this.state

    if (timerLimitsInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitsInMinutes: prevState.timerLimitsInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitsInMinutes: prevState.timerLimitsInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitsInMinutes, timerElapsedInSeconds} = this.state
    const isButtonsDisabled = timerElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            type="button"
            onClick={this.onDecreaseTimerLimitInMinutes}
            disabled={isButtonsDisabled}
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitsInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            type="button"
            onClick={this.onIncreaseTimerLimitInMinutes}
            disabled={isButtonsDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimerElapsedInSeconds = () => {
    const {timerLimitsInMinutes, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitsInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerElapsedInSeconds,
      timerLimitsInMinutes,
    } = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitsInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            alt={startOrPauseAltText}
            src={startOrPauseImageUrl}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onResetTimer}
        >
          <img
            className="timer-controller-icon"
            alt="reset icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimerFormat = () => {
    const {timerLimitsInMinutes, timerElapsedInSeconds} = this.state
    const totalRemaningSecond =
      timerLimitsInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(totalRemaningSecond / 60)
    const seconds = Math.floor(totalRemaningSecond % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes} : ${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <h1 className="elapsed-timer">
              {this.getElapsedSecondsInTimerFormat()}
            </h1>
            <p className="timer-state">{labelText}</p>
          </div>
        </div>
        <div className="controls-container">
          {this.renderTimerController()}
          {this.renderTimerLimitController()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
