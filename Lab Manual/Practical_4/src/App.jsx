import React from 'react'
import { useState } from 'react'

const App = () => {

  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
		<>
			<div className='text-center'>
        <div>Count: {count}</div>
			  <div className="count_operations">
          <button type="button" onClick={()=>{setCount(0)}}>Reset</button>
          <button type="button" onClick={()=>{setCount(count+1)}}>Increment</button>
          <button type="button" onClick={()=>{setCount(count-1)}}>Decrement</button>
          <button type="button" onClick={()=>{setCount(count+5)}}>Increment 5</button>
        </div>
        <h2>Welcome to Charusat!!!</h2>

        <div>First Name: <input type="text" placeholder='Firstname' value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
        <div>Last Name: <input type="text" placeholder='Lastname' value={lastName} onChange={e => setLastName(e.target.value)} /></div>

        <h3>First Name: {firstName}</h3>
        <h3>Last Name: {lastName}</h3>
      </div>
		</>
	);
}

export default App