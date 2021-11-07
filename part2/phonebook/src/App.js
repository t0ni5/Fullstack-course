import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/persons'
import Notification from './components/Notification';
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])






  const createPersonObject = () => {
    const personObj = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    return personObj

  }

  const addedMessage = (name) => {
    setMessage(`Added ${name}`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `)
      if (confirmation) {
        const personObject = createPersonObject()
        const personForReplace = persons.find(p => p.name === newName)

        personService.replacePerson(personObject, personForReplace.id)
          .then(returnedPerson => {
            const changedPerson = { ...personForReplace, number: newNumber }
            setPersons(persons.map(person => person.id !== personForReplace.id ? person : changedPerson))
            addedMessage(newName)
            setNewName('')
            setNewNumber('')
          })
      }

    } else if (persons.some(person => person.name !== newName)) {
      const personObject = createPersonObject()

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          addedMessage(newName)
          setNewName('')
          
          setNewNumber('')
        })
    }
  }

  const deletePersonFromList = (person) => {
    let confirmation = window.confirm(`Delete ${person.name} ?`)
    if (confirmation) {
      personService.deletePerson(person.id).then(
        setPersons(persons.filter(p => p.id !== person.id))
      )
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          setPersons(persons.filter(p => p.id !== person.id))
        })

    }
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
      <Notification message={message} />


      <Filter persons={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
        handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} newName={newName} addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePersonFromList={deletePersonFromList} />

    </div>
  )
}

export default App