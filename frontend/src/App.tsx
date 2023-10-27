import './App.css';
import Weather from './components/Weather/Weather';
import Timer from './components/Timer/Timer';

const App = () => {
  return (
    <div className="App">
      <Weather />
      <Timer />
    </div>
  );
};

export default App;
