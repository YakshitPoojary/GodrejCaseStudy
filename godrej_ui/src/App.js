import './App.css';
import Homepage from './components/homepage';
import withSplashScreen from './components/_withsplshscreen'; 
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      
    </div>
  );
}
export default withSplashScreen(App);

