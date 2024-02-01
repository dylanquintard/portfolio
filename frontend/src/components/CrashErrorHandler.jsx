import { Component } from 'react';

function logErrorToMyService(error, info) {
    // Implémentez la logique pour reporter l'erreur à votre service ici
    console.error('Error reported to service:', error, info);
  }
  
  class CrashErrorHandler extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
      logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }
  
  export default CrashErrorHandler;