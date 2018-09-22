import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = { value: '',
      error: null,
      isLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
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
    let { error, isLoaded, festivals } = this.state;
    if (error) {
      return (<div> Error: {error.message} </div>);
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var value = this.state.value.trim().toLowerCase();
      if(value.length > 0){
      festivals = festivals.filter(function(l){
            return l.details.en.title.toLowerCase().match( value );
        });
      }
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 ">
              <form>
                <div className="form-group">
                  <label htmlFor="search">Find a festival:</label>
                  <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="Festival title" />
                </div>
              </form>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <ul>
                {festivals.map((festival) =>
                  <div className="card card-outline-danger">
                    <img className="card-img-top img-fluid" src= {festival.media[0].url} alt={festival.title}/>
                    <div className="card-body">
                      <h4 className="card-title">{festival.details.en.title}</h4>
                      <p className="card-text">{festival.details.en.shortdescription}</p>
                      <h5 className="card-title">Date(s):</h5>
                      <p className="card-text">
                        <li key={festival.dates.singles}>
                          {festival.dates.singlesnk}
                        </li>
                      </p>
                      <h4 className="card-title"><a href={festival.urls[0]} className="btn btn-outline-danger"> Link to website </a></h4>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App;
