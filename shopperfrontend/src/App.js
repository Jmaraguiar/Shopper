import { useEffect, useState } from 'react';
import './App.css';
import { SplashScreen } from './pages/SplashScreen';
import { Router } from './routes/router';

function App() {
const [loading,setLoading] = useState(true)

  useEffect(()=>{
  setTimeout(()=>{
    setLoading(false)
  },3000)
},[])

  return (
    <div>
      {loading? <SplashScreen/> : <Router/>}
    </div>
    
  );
}

export default App;
