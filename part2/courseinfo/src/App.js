import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <p>Total of  {sum} exercises</p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part} />)}
    </div>
  )
}

const Course = (props) => {
  const { courses } = props


  /* const output = courses.reduce((content, course) => {
    content.push(<Header  course={course} />)
    content.push(<Content  course={course} />)
    content.push(<Total course={course} />)
    return content
  }, []) */




  return (
    <div>
      {courses.map(course => {
        return (
          <>
            <Header  course={course} />
            <Content  course={course} />
            <Total  course={course} />
          </>
        )
      }
      )
      }
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App