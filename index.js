import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  	if(props.highlight){
  		return(
    	<button className="square" style={{color : "red"}} onClick={props.onClick}>
      		{props.value}
    	</button>
    	);
	}
	else{
		/*TO DO*/
	}

	return (
	<button className="square" onClick={props.onClick}>
      	{props.value}
    </button>

  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares;
    }
  }
  return null;
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	handleClick(i) {
	  const history = this.state.history;
	  const squares = this.state.squares.slice();
	  if (calculateWinner(squares) || squares[i]) {
	  	return;
	  }
	  squares[i] = this.state.xIsNext ? 'X' : 'O';
	  this.setState({
	  		squares: squares,
	  	xIsNext: !this.state.xIsNext,
	  });
	}

	renderSquare(i) {
	    return (
	    	<Square
	     		value={this.state.squares[i]} 
	     		onClick={() => this.handleClick(i)}
	     	/>
	    );	
	}

	startOver() {
		this.setState({
			squares: Array(9).fill(null),
			xIsNext: true,
		});
	}

  	render() {
	    let winner = calculateWinner(this.state.squares);
	    let status;

	    if (winner) {
	      status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
	    } 
	    else {
	      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
	    }

	    var rows = [];
	    var columns = [];
	    var index = 0;
	    var rowNumber = 1;
	    for(var i = 0; i<3; i++){
	    	for(var j = 0; j<3; j++){
	    		columns.push(<div key={index}>{this.renderSquare(index)}</div>)
	    		index++;
	    	}
	    	rows.push(<div key={i}>{columns}</div>)
	    	columns = [];
	    }

	    return (
	      <div className="CSSDemo">
	      <div className="titlePanel">Tic Tac Toe</div>
	      <div className="statusPanel">{status}</div>
	        <div className="grid-container">
	        	{rows}
	        </div>
	       	<div className="replayButtonPanel">
	       		<div className="replayButton" onClick={() => this.startOver()}>  </div>
	       	</div>
	      </div>
	    );
  	}
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

/// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
