import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
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
      return
      <div>
        Error: {error.message}
      </div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {festivals.map(festival => (
            <p>
              {festival.details.en.title}
            </p>
          ))}
        </div>
      );
    }
  }
}

export default App;
