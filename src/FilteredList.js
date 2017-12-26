import React, { Component } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
    error: null,
    isLoaded: false,
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
        <div>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Type here" />
          <ul>
            { festivals.map((festival) =>
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
            )}
          </ul>
        </div>
      )
    }
  }

  //     var value = this.state.value.trim().toLowerCase();
  //
  //     if(value.length > 0){
  //
  //       // We are searching. Filter the results.
  //     festivals = festivals.filter(function(l){
  //           return l.details.en.title.toLowerCase().match( value );
  //       });
  //     }
  //     return (
  //       <div>
  //         <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Type here" />
  //         <ul>
  //           { festivals.map((festival) =>
  //             <div className="card card-outline-danger">
  //               <div className="row">
  //                 <div className="col-6">
  //                   <div className="card-block">
  //                     <h4 className="card-title">
  //                       {festival.details.en.title}
  //                     </h4>
  //                     <p className="card-text">
  //                       {festival.details.en.shortdescription}
  //                     </p>
  //                   </div>
  //                   <div className="card-block">
  //                     <a href={festival.urls[0]} className="btn btn-outline-danger"> {festival.urls[0]}</a>
  //                   </div>
  //                 </div>
  //                 <div className="col-6">
  //                   <img className="card-img-top" src= { festival.media[0].url} alt={festival.title}/>
  //                 </div>
  //               </div>
  //             </div>
  //           ) }
  //         </ul>
  //       </div>
  //     )
  // }
}

export default App;
