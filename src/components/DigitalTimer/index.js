// Write your code here
import {Component} from 'react'
import './index.css'

const play = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pause = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const reset = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

const initialState = {isPause: true, time: 25, timeInSeconds: 0}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onIncrease = () => {
    this.setState(prevState => ({
      time: prevState.time + 1,
    }))
  }

  onDecrease = () => {
    const {time} = this.state
    if (time > 1) {
      this.setState(prevState => ({
        time: prevState.time - 1,
      }))
    }
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {time, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === time * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isPause: true})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {time, timeInSeconds, isPause} = this.state

    const timeComplete = timeInSeconds === time * 60

    if (timeComplete) {
      this.setState({
        timeInSeconds: 0,
      })
    }
    if (!isPause) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({
      isPause: !prevState.isPause,
    }))
  }

  onReset = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  getElapsedSecondsInTimeFormat = () => {
    const {time, timeInSeconds} = this.state
    const totalRemainingSeconds = time * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isPause, time} = this.state
    const imgUrl = isPause ? play : pause
    const alt = isPause ? 'pause icon' : 'play icon'
    const status = isPause ? 'Start' : 'Pause'
    const action = isPause ? 'Paused' : 'Running'
    console.log(isPause)

    return (
      <div className="app-container">
        <div className="digital-container">
          <div className="timer-container">
            <h1 className="head">Digital Timer</h1>
            <div className="operating-box">
              <div className="clock">
                <div className="timer">
                  <h1 className="time">
                    {this.getElapsedSecondsInTimeFormat()}
                  </h1>
                  <p className="action">{action}</p>
                </div>
              </div>
              <div className="data-container">
                <div className="operate">
                  <div className="operating-container">
                    <button
                      type="button"
                      className="icon"
                      onClick={this.onStartOrPause}
                    >
                      <img src={imgUrl} alt={alt} className="fun-icon" />
                    </button>
                    <p className="status">{status}</p>
                  </div>

                  <div className="reset-container">
                    <button
                      type="button"
                      className="icon"
                      onClick={this.onReset}
                    >
                      <img
                        src={reset}
                        alt="reset icon"
                        className="reset-icon"
                        onClick={this.onReset}
                      />
                    </button>

                    <p className="status">reset</p>
                  </div>
                </div>
                <p className="desc">Set Timer Limit</p>
                <div className="increase-container">
                  <button
                    type="button"
                    className="increase button"
                    onClick={this.onDecrease}
                  >
                    -
                  </button>
                  <p className="set-time">{time}</p>
                  <button
                    type="button"
                    className="increase button"
                    onClick={this.onIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
