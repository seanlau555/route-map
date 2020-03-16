import React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import './App.css'
import { appActionCreators } from './redux'
import Inputs from './components/Inputs'
import Map from './components/Map'
import { routeSelector } from './redux/app/selectors'

class App extends React.PureComponent {
  render() {
    const {
      route,
      isFetching,
      PostRoute,
      origin,
      destination,
      errorMessage
    } = this.props
    return (
      <div className="App">
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Inputs
              route={route}
              errorMessage={errorMessage}
              PostRoute={PostRoute}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Map
              origin={origin}
              destination={destination}
              isFetching={isFetching}
              route={route}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  token: app.token,
  route: routeSelector({ app }),
  isFetching: app.isFetching,

  origin: app.origin,
  destination: app.destination,
  errorMessage: app.errorMessage
})

const mapDispatchToProps = {
  PostRoute: appActionCreators.postRoute
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
