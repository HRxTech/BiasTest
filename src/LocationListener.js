import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

class LocationListener extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor() {
      super();
      ReactGA.initialize('UA-110938505-1');
  }

  componentDidMount() {
    this.handleLocationChange(this.context.router.history.location);
    this.unlisten = this.context.router.history.listen(this.handleLocationChange);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleLocationChange(location) {
    ReactGA.pageview(location.pathname + location.search);
  }

  render() {
    return this.props.children;
  }
} 

export default LocationListener;