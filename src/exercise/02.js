// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function getPropertyFromLocalStorage(propertyName) {
  let storedPropertyVal = window.localStorage.getItem(propertyName)
  return storedPropertyVal
}

function determineInitialState(propertyName, initialProperty) {
  return getPropertyFromLocalStorage(propertyName) || initialProperty
}

function setNameInLocalStorage(propertyName, propertyValue) {
  window.localStorage.setItem(propertyName, propertyValue)
}

// bonus #3 custom hook, I would extract this as class that exposes this one
// public func
// function useLocalStorageState(initialValue) {
//   const [property, setProperty] = React.useState(determineInitialState(initialValue))

//   React.useEffect(() => {
//     setNameInLocalStorage(property)
//     //bonus #2 use effect dependencies array
//   }, [property])

//   return [property, setProperty]
// }

// bonus #4 accept any type for state
function useLocalStorageState(propertyName, initialValue) {
  let initialValueIsObject = false

  // if true object need to serialize, useState only shallow compares objects - deep changes won't cause re-render
  if ( typeof initialValue === 'object') {
  // if ( typeof initialValue === Object && initialValue instanceof Array === false) {
    initialValue = JSON.stringify(initialValue)
  }

  // bonus #1 lazy state initialization
  const [stateProperty, setStateProperty] = React.useState(() => {
    determineInitialState(propertyName, initialValue)

    return typeof initialValue === 'function' ? initialValue() : initialValue 
  })
  
  React.useEffect(() => {
    //bonus #2 use effect dependencies array
  }, [stateProperty, propertyName])

  return [stateProperty, setStateProperty]
}

  function Greeting({propertyName, initialPropertyValue=''}) {
    console.log(propertyName);

  const [name, setName] = useLocalStorageState(propertyName, initialPropertyValue)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [highFives, setHighFives] = React.useState(0)

  return (
    <>
      <button onClick={() => setHighFives(highFives + 1)}></button>
      <p>You Have {highFives} high fives!</p>
      <Greeting propertyName='name' />
    </>
  )
}

export default App
