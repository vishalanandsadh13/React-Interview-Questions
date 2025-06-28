This question is a live code done in shared environment on codesandbox/stackblitz. The link of the project MUST be included in the comments. Create a countdown timer that will countdown from 30 and update every second. When the countdown hits 0, display 'Take Off' There is a Reset button next to the timer. The Reset button will reset the timer to 30 sec if the takeoff has not already happened.' After takeoff, reset is not possible. Include your observations in the detailed comments around following: 1. How the candidate understood the problem statement. 2, Understanding of browser behavior. 3. Understanding of events 4. Understanding of state management 5. Understanding and handling time varying conditions etc.
Easy | 0 mins | BIE | State-managementEvent-loop




/**
 * Countdown Timer with Reset and Takeoff
 * Live demo: https://codesandbox.io/p/sandbox/react-countdown-timer-takeoff-reset-0szr54
 *
 * Observations:
 * 1. Problem Understanding:
 *    - Candidate correctly understood the need to count down from 30 to 0.
 *    - On reaching 0, "Take Off" should be displayed instead of the number.
 *    - Reset must work only before Take Off.
 *
 * 2. Browser Behavior:
 *    - Used setInterval, which is tied to the browser's event loop.
 *    - Cleaned up interval properly with clearInterval to avoid memory leaks.
 *
 * 3. Event Handling:
 *    - Handled `Reset` button click via React onClick event.
 *    - Handled lifecycle with useEffect to manage interval on mount/update.
 *
 * 4. State Management:
 *    - Used `useState` to track current countdown and takeOff state.
 *    - Timer and UI synced through state updates every second.
 *
 * 5. Time-Varying Conditions:
 *    - Used useEffect dependencies and conditional checks to handle transitions.
 *    - Prevented reset post-takeoff and stopped countdown on reaching 0.
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(30); // initial time
  const [hasTakenOff, setHasTakenOff] = useState(false); // status flag

  useEffect(() => {
    if (hasTakenOff) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasTakenOff]);

  useEffect(() => {
    if (timeLeft === 0 && !hasTakenOff) {
      setHasTakenOff(true);
    }
  }, [timeLeft, hasTakenOff]);

  const handleReset = () => {
    if (!hasTakenOff) {
      setTimeLeft(30);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 Countdown Timer</h1>
      <h2>{hasTakenOff ? "Take Off" : `${timeLeft} seconds`}</h2>
      <button onClick={handleReset} disabled={hasTakenOff}>
        Reset
      </button>
    </div>
  );
}

ReactDOM.render(<CountdownTimer />, document.getElementById("root"));
