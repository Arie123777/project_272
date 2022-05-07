import logo from './logo.svg';
import './App.css';
import background from "./main_background.png";
function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${background})`}}>
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <form action='/user' method='GET'>
        Username: <input type="text" name='username'></input>
        Password: <input type='password' name='password'></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
