import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://open.data.amsterdam.nl/Festivals.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            festivals: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, festivals } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        festivals.map((festival) =>
          <div className="card card-outline-danger">
            <div className="row">
              <div className="col-6">
                <div className="card-block">
                  <h4 className="card-title">
                    {festival.details.en.title}
                  </h4>
                  <p className="card-text">
                    {festival.details.en.shortdescription}
                  </p>
                </div>
                <div className="card-block">
                  <a href={festival.urls[0]} className="btn btn-outline-danger"> {festival.urls[0]}</a>
                </div>
              </div>
              <div className="col-6">
                <img className="card-img-top" src= { festival.media[0].url} alt={festival.title}/>
              </div>
            </div>
          </div>
        )
      );
    }
  }
}

export default App;
