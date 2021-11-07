import React from 'react'

const Person = ({ person }) => person.name

const Number = ({ person }) => ` ${person.number}`


const Persons = ({persons, newFilter, deletePersonFromList }) => {
    const personsToShow = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

   /*  const deletePersonFromList = (person) => {
        let confirmation = window.confirm(`Delete ${person.name} ?`)
        if (confirmation) {
            deletePerson(person.id)
        }
    } */

    return (

        personsToShow.map(person => {
            return (
                <div key={person.name + person.number}>
                    <Person key={person.name} person={person} />
                    <Number key={person.number} person={person} />&nbsp; 
                        <button onClick={() => deletePersonFromList(person)} >delete</button>
                    

                </div >
            )
        }
        )
    )

}

export default Persons