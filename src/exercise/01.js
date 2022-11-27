// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [userName, setUserName] = React.useState(initialName)

  function handleChange(event) {
    setUserName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={userName} />
      </form>
      {userName ? <strong>Hello {userName}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Jeriah" />
}

export default App
