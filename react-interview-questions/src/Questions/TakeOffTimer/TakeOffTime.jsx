import React from 'react'
import { useState, useEffect } from 'react';

const TakeOffTimer = () => {
  const [timeleft, setTimeLeft] = useState(15)
  const [isActive, setIsActive] = useState(false);

  const handleReset = () => {
    setTimeLeft(15);
    setIsActive(false);
  }

  useEffect(() => {
    if(isActive) return;
     const timer = setInterval(()=>{
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0; // Stop the timer at 0
        }
        return prevTime - 1;
      });
     },1000)
     return () => clearInterval(timer);
  }, [isActive]);

  useEffect(()=>{
    if (timeleft === 0) {
      setIsActive(true);
    }
  })

  return (
    <div>
      <div style={{fontSize:'20px', textAlign: 'center' , marginTop:'50px'}}>Take Off Timer</div>
      <div style={{fontSize:'50px', textAlign: 'center' , marginTop:'20px'}}>{isActive ? 'Taken OOF!!!' : `${timeleft} Seconds`}</div>
      <div style={{textAlign: 'center' , marginTop:'20px'}}>
        <button onClick={handleReset} disabled={isActive}>
          Reset
          </button>   
        </div>
      
    </div>
  )
}

export default TakeOffTimer