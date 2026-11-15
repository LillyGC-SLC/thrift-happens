import './App.css';
import ThriftHappensApp from './Components/ThriftHappensApp';
import data from "./data/data";
import logo from './assets/images/logo.png';

// Lilly Grant Cochrane
// Web Development Project #1

function App() {
  return (
    <>
      <img id="logo" src={logo} alt="Logo" ></img>
      <ThriftHappensApp data={ data }/>
    </>
  )
}

export default App;
