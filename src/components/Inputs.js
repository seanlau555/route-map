import React from 'react'
import styled from 'styled-components'
import { Input, Button } from 'antd'
import { Autocomplete } from '@react-google-maps/api'
import { withScriptjs } from 'react-google-maps'
import { compose, withProps } from 'recompose'
import * as R from 'ramda'

class Inputs extends React.PureComponent {
  state = {
    startLocation: '',
    dropOffPoint: ''
  }

  onStartLocationChange = evt => {
    this.setState({ startLocation: evt.target.value })
  }

  onDropOffPointChange = evt => {
    this.setState({ dropOffPoint: evt.target.value })
  }

  onAutoLoadStartLocation = autocomplete => {
    this.startLocationAutoComplete = autocomplete
  }

  onStartLocationComplete = () => {
    if (this.startLocationAutoComplete !== null) {
      const place = this.startLocationAutoComplete.getPlace()
      this.setState({ startLocation: place.formatted_address })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  onAutoLoadDropOff = autocomplete => {
    this.dropOffAutoComplete = autocomplete
  }

  onDropOffComplete = () => {
    if (this.dropOffAutoComplete !== null) {
      const place = this.dropOffAutoComplete.getPlace()
      this.setState({ dropOffPoint: place.formatted_address })
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  onSubmit = () => {
    const { PostRoute } = this.props
    const { startLocation, dropOffPoint } = this.state

    PostRoute({
      origin: startLocation,
      destination: dropOffPoint
    })
  }
  onReset = () => {
    this.setState({ startLocation: '', dropOffPoint: '' })
  }

  render() {
    const { startLocation, dropOffPoint } = this.state
    const {
      errorMessage,
      route: { totalDistance, totalTime }
    } = this.props
    return (
      <StyledInputs>
        <div className="header-title">Start location</div>
        <Autocomplete
          onLoad={this.onAutoLoadStartLocation}
          onPlaceChanged={this.onStartLocationComplete}
        >
          <StyledInput
            value={startLocation}
            onChange={this.onStartLocationChange}
            allowClear
          />
        </Autocomplete>
        <div className="header-title">Drop-off point</div>
        <Autocomplete
          onLoad={this.onAutoLoadDropOff}
          onPlaceChanged={this.onDropOffComplete}
        >
          <StyledInput
            value={dropOffPoint}
            onChange={this.onDropOffPointChange}
            allowClear
          />
        </Autocomplete>
        {totalDistance !== 0 && totalTime !== 0 && (
          <React.Fragment>
            <div>Total distance: {totalDistance}</div>
            <div>Total time: {totalTime}</div>
          </React.Fragment>
        )}
        {errorMessage && <StyledError>{errorMessage}</StyledError>}
        <ButtonWrapper>
          <Button
            type="primary"
            onClick={this.onSubmit}
            disabled={!(!R.isEmpty(startLocation) && !R.isEmpty(dropOffPoint))}
          >
            Submit
          </Button>
          <Button
            type="primary"
            onClick={this.onReset}
            disabled={!(!R.isEmpty(startLocation) || !R.isEmpty(dropOffPoint))}
          >
            Reset
          </Button>
        </ButtonWrapper>
      </StyledInputs>
    )
  }
}

const StyledError = styled.div`
  margin-top: 16px;
  color: red;
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  button {
    margin-right: 16px;
  }
`

const StyledInputs = styled.div`
  padding: 16px 24px;
  .header-title {
    margin-top: 32px;
    font-size: 16px;
  }
`

const StyledInput = styled(Input)`
  width: 100%;
`

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs
)(Inputs)
