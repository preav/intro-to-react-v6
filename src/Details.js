import { Component, lazy } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const Modal = lazy(() => import("./Modal"));

class Details extends Component {
  // this is a valid js but is not supported completely so we'll use babel for this
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => {
    window.location = "http://bit.ly/pet-adopt";
  };

  render() {
    if (this.state.loading) {
      return <h1>We're loading!</h1>;
    } else {
      const {
        animal,
        breed,
        city,
        state,
        description,
        name,
        images,
      } = this.state;

      return (
        <div className="details">
          <Carousel images={images} />
          <h2>{name}</h2>
          <h3>
            {animal} - {breed} - {city}, {state}{" "}
          </h3>
          <p>{description}</p>
          <ThemeContext.Consumer>
            {([theme]) => {
              return (
                <>
                  <button
                    className="details-btn"
                    style={{ backgroundColor: theme }}
                    onClick={this.toggleModal}
                  >
                    Adopt Me!
                  </button>
                  {this.state.showModal ? (
                    <Modal>
                      <div>
                        <p>Would you like to adopt me?</p>
                        <button
                          onClick={this.adopt}
                          className="buttons"
                          style={{ backgroundColor: theme }}
                        >
                          YES!!!
                        </button>
                        <button
                          onClick={this.toggleModal}
                          className="buttons"
                          style={{ backgroundColor: theme }}
                        >
                          NOP!!!
                        </button>
                      </div>
                    </Modal>
                  ) : null}
                </>
              );
            }}
          </ThemeContext.Consumer>
        </div>
      );
    }
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
