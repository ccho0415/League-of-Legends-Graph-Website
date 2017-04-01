import React from 'react'
import ReactDOM from 'react-dom';
class CategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class Game extends React.Component {
  render() {
    var name = this.props.game.stocked ?
      this.props.game.name :
      <span style={{color: 'red'}}>
        {this.props.game.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.game.price}</td>
      </tr>
    );
  }
}

class GameTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.games.forEach((game) => {
      if (game.name.indexOf(this.props.filterText) === -1) {
        return;
      }    	
      if (game.category !== lastCategory) {
        rows.push(<CategoryRow category={game.category} key={game.category} />);
      }
      rows.push(<Game game={game} key={game.name} />);
      lastCategory = game.category;
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props){
  	super(props);
  	this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  } 
  render() {
    return (
      <form>
        <input 
        	type="text" 
        	placeholder="Search..." 
        	value={this.props.filterText} 
        	onChange= {this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class SummonerSearch extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		filterText: ''
  	};
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  render() {
    return (
      <div>
        <SearchBar 
        	filterText={this.state.filterText}
          	onFilterTextInput={this.handleFilterTextInput}        	
        />
        <GameTable 
        	games={this.props.games} 
        	filterText={this.state.filterText}
        />
      </div>
    );
  }
}


var GAMES = [
  {category: 'Normal', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'ARAM', price: '$9.99', stocked: false, name: 'Baseball'},
];
 
ReactDOM.render(
  <SummonerSearch games={GAMES} />,
  document.getElementById('root')
);