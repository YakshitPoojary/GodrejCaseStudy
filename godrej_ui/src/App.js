import './App.css';
import Homepage from './components/homepage';
import withSplashScreen from './components/_withsplshscreen'; 

function App() {
  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}
export default withSplashScreen(App);

