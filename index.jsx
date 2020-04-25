function Square(props) {
  return (
    <button className={`square ${props.winningClass}`} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    const winningClass =
      this.props.winnerRow && this.props.winnerRow.includes(i)
        ? 'bold-text'
        : ''

    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        winningClass={winningClass}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  createBoard = () => {
    let curSquare = 0
    const board = []

    for (let row = 0; row < 3; row++) {
      // for each row
      const columns = []
      for (let col = 0; col < 3; col++) {
        // for each col
        columns.push(this.renderSquare(curSquare++))
      }
      board.push(
        <div key={row} className='board-row'>
          {columns}
        </div>
      )
    }
    return board
  }

  render() {
    return <div>{this.createBoard()}</div>
  }
}

const initial_state = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
  sortHistoryAsc: true,
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = initial_state
  }

  handleSortClick() {
    this.setState({
      sortHistoryAsc: !this.state.sortHistoryAsc,
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares).winner || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([
        {
          squares: squares,
          coordinates: getCoordinates(i),
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const { winner, winnerRow } = calculateWinner(current.squares)

    const NewGame = (
      <button onClick={() => this.setState(initial_state)}>New Game</button>
    )

    const SortButton = (
      <button onClick={() => this.handleSortClick()}>
        Sort Asc: {this.state.sortHistoryAsc.toString()}
      </button>
    )

    let sortedHistory = [...history] // copy history
    if (this.state.sortHistoryAsc === false)
      sortedHistory = sortedHistory.reverse()

    const moves = sortedHistory.map((step, move) => {
      if (this.state.sortHistoryAsc === false)
        move = sortedHistory.length - 1 - move
      const player = move % 2 === 0 ? 'X' : 'O'
      const buttonClass = this.state.stepNumber == move ? 'bold-text' : ''
      const coordinates = step.coordinates ? step.coordinates : ''
      const desc = move ? `Go to move #${move}` : 'Go to game start'

      return (
        <li key={move}>
          <button className={buttonClass} onClick={() => this.jumpTo(move)}>
            {`${desc} Player: ${player} ${coordinates}`}
          </button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else if (this.state.history.length === 10) {
      // if no winner and history length is 10
      status = 'Game Over! No Winner!'
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            winnerRow={winnerRow}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <div>
            {NewGame} {SortButton}
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

const getCoordinates = move => {
  return `[row:${Math.floor(move / 3) + 1}, col:${(move % 3) + 1}]`
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerRow: lines[i] }
    }
  }
  return { winner: null, winnerRow: null }
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
