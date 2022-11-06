import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(1500);
  const [session, setSession] = useState(true);

  const [start, setStart] = useState(false);

  const timeout = setTimeout(() => {
    if (timer && start) {
      setTimer(timer - 1);
    }
  }, 1000);

  const handleBreakInc = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const handleBreakDec = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const handleSessionInc = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimer(timer + 60);
    }
  };
  const handleSessionDec = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimer(timer - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setStart(false);
    setTimer(1500);
    setBreakLength(5);
    setSessionLength(25);
    setSession(true);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handleStart = () => {
    clearTimeout(timeout);
    setStart(!start);
  };

  const resetTime = () => {
    const audio = document.getElementById("beep");
    if (!timer && session === true) {
      setTimer(breakLength * 60);
      setSession(false);
      audio.play();
    }
    if (!timer && session === false) {
      setTimer(sessionLength * 60);
      setSession(true);
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (start) {
      timeout;
      resetTime();
    } else {
      clearTimeout(timeout);
    }
  };
  useEffect(() => {
    clock();
  }, [start, timer, timeout]);

  const time = () => {
    const mins = Math.floor(timer / 60);
    const secs = timer - mins * 60;
    const timeFormatSec = secs < 10 ? "0" + secs : secs;
    const timeFormatMin = mins < 10 ? "0" + mins : mins;
    return `${timeFormatMin}:${timeFormatSec}`;
  };

  const label = session === true ? "Session" : "Break";
  return (
    <div className="App">
      <header className="App-header ">
        <div className="container">
          <div className="row">
            <div className="my-5">
              <h1>Pomodoro Clock</h1>
            </div>

            <div className="col-6">
              <h3 id="break-label"> Break Length</h3>
              <button
                disabled={start}
                id="break-increment"
                onClick={handleBreakInc}
              >
                +
              </button>
              <span id="break-length">{breakLength}</span>
              <button
                disabled={start}
                id="break-decrement"
                onClick={handleBreakDec}
              >
                -
              </button>
            </div>
            <div className=" col-6">
              <h3 id="session-label"> Session Length</h3>
              <button
                disabled={start}
                id="session-increment"
                onClick={handleSessionInc}
              >
                +
              </button>
              <span id="session-length">{sessionLength}</span>
              <button
                disabled={start}
                id="session-decrement"
                onClick={handleSessionDec}
              >
                -
              </button>
            </div>
            <div className="">
              <div>
                <h3 id="timer-label">{label}</h3>
                <span id="time-left">{time()}</span>
              </div>
              <div>
                <button onClick={handleStart} id="start_stop">
                  Start/Stop
                </button>

                <button onClick={handleReset} id="reset">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg"
        ></audio>
      </header>
    </div>
  );
};

export default App;
