import React from 'react'

const Header = ({ course }) => {
    return (
      <h1 ><b>{course.name}</b></h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
  
    return (
      <p><b>Total of  {sum} exercises</b></p>
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
        <h1>Web development curriculum</h1>
        {courses.map(course => {
          return (
            <div key={course.parts[0].name}>
              <Header key={course.id} course={course} />
              <Content key={course.name} course={course} />
              <Total key={course.parts[1].name} course={course} />
            </div>
  
          )
        }
        )
        }
      </div>
    )
  }


  export default Course