import React from 'react';
import TakeOffTimer from './Questions/TakeOffTimer/TakeOffTime';
import { Counter } from './Questions/Counter/Counter';
import { CamelCaseToSnakeCase } from './Questions/CamelCaseToSnakeCase/CamelCaseToSnakeCase';

export const App = () => {
  return (
    <>
    <div>
     {/* <TakeOffTimer/> */}
     {/* <Counter/> */}
     <CamelCaseToSnakeCase/>
    </div>
    </>
  )
}
export default App
