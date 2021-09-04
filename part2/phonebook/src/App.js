import React, { useState } from 'react'

const Person = ({ person }) => person.name

const Number = ({ person }) => ` ${person.number}`


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '012345'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')



  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
          <div>number: <input
            value={newNumber}
            onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <div key={person.name + person.number}>
            <Person key={person.name} person={person} />
            <Number key={person.number} person={person} /> <br></br>

          </div >
        )
      }
      )
      }

    </div>
  )
}

export default App