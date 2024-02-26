import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="Good " value={props.good} />
          <Statistic text="Neutral " value={props.neutral} />
          <Statistic text="Bad " value={props.bad} />
          <Statistic text="All " value={props.all} />
          <Statistic text="Average " value={props.average} />
          <Statistic text="Positive " value={props.positive + "%"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // App unicafe
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all,setAll] = useState(0)
  const [average,setAverage] = useState(0)
  const [positive,setPositive] = useState(0)

  const handleGood = ()=>{
    const newGood = good + 1
    setGood(newGood)
    const newAll = all + 1
    setAll(newAll)
    handleStatistics(newAll, newGood, neutral, bad)
  }

  const handleNeutral = ()=>{
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    const newAll = all + 1
    setAll(newAll)
    handleStatistics(newAll, good, newNeutral, bad)
  }

  const handleBad = ()=>{
    const newBad = bad + 1
    setBad(newBad)
    const newAll = all + 1
    setAll(newAll)
    handleStatistics(newAll, good, neutral, newBad)
  }

  const handleStatistics = (newAll, good, neutral, bad) => {
    const newAverage = (good - bad) / newAll
    setAverage(newAverage)
    const newPositive = (good / newAll) * 100
    setPositive(newPositive)
  };

  // App anecdotes
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleNextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button handleClick={handleVote} text="Vote"/>
        <Button handleClick={handleNextAnecdote} text="Next anecdote"/>
        </div>
        <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        <p>has {Math.max(...votes)} votes</p>
        </div>
    </div>
  )
}

export default App