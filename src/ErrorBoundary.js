import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error, info) {
    console.error("Error boundary caught an error", error, info);
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000); // putting this inside this lifecycle because componentDidUpdate won't catch the error on first render, in case any error occurs
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <p>
          This listing has an error. <Link to="/">Click here </Link> to go back
          to homepage or wait 5 secs
        </p>
      );
    }
    return this.props.children;
  }
}
