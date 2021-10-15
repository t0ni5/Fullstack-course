import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

console.log('render', persons.length,'persons')
  


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

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

  }


  return (
    <div>
      <h2>Phonebook</h2>


      <Filter persons={newFilter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNewName={setNewName}  setNewNumber={setNewNumber}
      handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} newName={newName} addPerson={addPerson}/>
      
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}/>

    </div>
  )
}

export default App