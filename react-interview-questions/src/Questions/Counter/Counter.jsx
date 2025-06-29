import React from 'react';
import { useState } from 'react';

export const Counter = () => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1);

    }
    const decrement = () => {
        setCount(count - 1);
    }
  return (
    <div>
        <h1>Counter Component</h1>
        <p>This is a simple counter component.</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}> Decrement</button>
        <p>Current Count: {count}</p>
    </div>
  )
}
