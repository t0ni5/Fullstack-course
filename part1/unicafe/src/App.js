import React, { useState } from 'react'

const Caption = (props) => <h1> {props.text} </h1>

const StatisticLine = ({ text, value }) => <><br />{text + " " + value} </>

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick} > {text} </button>
}

const Statistics = (props) => {
  const { good, neutral, bad } = props.grades
  const totalFeedback = () => good + bad + neutral

  const calculatePositive = () => {
    const positive = good / totalFeedback() * 100
    return (positive.toString().concat(" %"))
  }

  const calculateAverage = () => (good - bad) / totalFeedback()


  if (props.grades.good === 0 && props.grades.neutral === 0 && props.grades.bad === 0) {
    return "No feedback given"
  }


  return (
    <div>
      <table cellSpacing="0">
        <tbody>
          <tr>
            <td><StatisticLine text="good" value={good} />
            </td>
          </tr>

          <tr>
            <td> <StatisticLine text="neutral" value={neutral} />
            </td>
          </tr>


          <tr><td> <StatisticLine text="bad" value={bad} /></td></tr>


          <tr>
            <td><StatisticLine text="all" value={totalFeedback()} /></td>
          </tr>


          <tr>
            <td><StatisticLine text="average" value={calculateAverage()} /></td>
          </tr>


          <tr>
            <td><StatisticLine text="positive" value={calculatePositive()} /></td>
          </tr>
        </tbody>

      </table>
    </div>
  )


}






const App = () => {
  // save clicks of each button to its own state
  const [grades, setGrades] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })


  const handleNeutral = () => {
    const newGrades = {
      ...grades,
      neutral: grades.neutral + 1
    }

    setGrades(newGrades)
  }

  const handleGood = () => {
    const newGrades = {
      ...grades,
      good: grades.good + 1
    }

    setGrades(newGrades)
  }

  const handleBad = () => {
    const newGrades = {
      ...grades,
      bad: grades.bad + 1
    }

    setGrades(newGrades)
  }



  return (
    <div>
      <Caption text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Caption text="statistics" />
      <Statistics grades={grades} />
      {/* <Statistics text="good" number={good} />
        <Statistics text="neutral" number={neutral} />
        <Statistics text="bad" number={bad} />
        <Statistics text="all" number={good + neutral + bad} />
        <Statistics text="average" number={calculateAverage()} />
        <Statistics text="positive" number={calculatePositive()} /> */}


    </div>
  )
}

export default App