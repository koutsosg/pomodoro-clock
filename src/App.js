
import "./App.css";

function App() {
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
              <button>-</button>
              <span>5</span>
              <button>+</button>
            </div>
            <div className=" col-6">
              <h3 id="session-label"> Session Length</h3>
              <button>-</button>
              <span>25</span>
              <button>+</button>
            </div>
            <div className="">
              <div>
                <h3>Session</h3>
                <span>24:00</span>
              </div>
              <div>
                <button type="">Start</button>
                <button type="">Pause</button>
                <button type="">Refreash</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
