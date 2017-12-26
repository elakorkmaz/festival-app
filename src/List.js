class FilteredList extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.filterList = this.filterList.bind(this);
    }

    filterList(event){
      var updatedList = this.state.initialItems;
      updatedList = updatedList.filter(function(item){
        return item.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: updatedList});
    }

    getInitialState(){
       return {
         initialItems: [
           "Apples",
           "Broccoli",
           "Chicken",
           "Duck",
           "Eggs",
           "Fish",
           "Granola",
           "Hash Browns"
         ],
         items: []
       };
    }

    componentWillMount(){
      this.setState({items: this.state.initialItems});
    }

    render(){

      return (
        <div className="filter-list">
          <form>
          <fieldset className="form-group">
          <input type="text" className="form-control form-control-lg" placeholder="Search" value={this.state.value} onChange={this.filterList}/>
          </fieldset>
          </form>
          <p key={this.state.items}></p>
        </div>
      );
    }
  };
