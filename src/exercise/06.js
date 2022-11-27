// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
// import { ErrorBoundary } from './ErrorBoundry'

// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {

  const [componentState, setComponentState] = React.useState({
    pokemonMetadata: null,
    requestState: pokemonName ? 'pending' : 'idle',
    errorMessage: null
  }) 

  React.useEffect(() => {    
    async function effect() {
      let currentStateCopy
      
      currentStateCopy = Object.assign({}, componentState)
      currentStateCopy.requestState = 'idle'
      setComponentState(currentStateCopy)

      if (!pokemonName) {
        return
      }

      currentStateCopy = Object.assign({}, componentState)
      currentStateCopy.requestState = 'pending'
      setComponentState(currentStateCopy)

      let pokemonResponse

      try {
        pokemonResponse = await fetchPokemon(pokemonName)
      } catch (err) {
        currentStateCopy = Object.assign({}, componentState)
        currentStateCopy.requestState = 'rejected'
        currentStateCopy.errorMessage = err.message 
        setComponentState(currentStateCopy)
        return
      }
      
      currentStateCopy = Object.assign({}, componentState)
      currentStateCopy.requestState = 'resolved'
      currentStateCopy.pokemonMetadata = pokemonResponse 
      setComponentState(currentStateCopy)
    }

    effect()
  }, [pokemonName])

  if (componentState.requestState === 'idle') {
    return 'Submit a pokemon'
  } else if (componentState.requestState === 'rejected') {
    // handled by error boundary
    throw new Error(componentState.errorMessage)
  } else if (componentState.requestState === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  // else if requestState === 'resolved'
  } else {
    return <PokemonDataView pokemon={componentState.pokemonMetadata} /> 
  }
  
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  // function handleReset() {
  //   setPokemonName('')
  // }

  return (
  
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          {/* <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}> */}
          <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pokemonName]}>
            <PokemonInfo pokemonName={pokemonName} />
          </ErrorBoundary>
        </div>
      </div>
    
  )
}

export default App
