import './App.css';
import {useState} from "react";
interface GreetingProp{
  name:string;
}
function App() {
  const[name,setname]=useState<string>("");

return(
  <main className="app-container">
    <div className="card">
    <h1 className="title">Greeting Card</h1>
    <input
    className="name-input"
    type="text"
    value={name}
    onChange={(e)=>setname(e.target.value)}
    placeholder='Enter your name'
    />
    <GreetingCard name={name}/>
    </div>
  </main>
);
}
function GreetingCard({name}:GreetingProp){
  const displayName=name.trim()||"stranger";
  return(
    <div className="greeting-box">
      <h2>Hello, {displayName}!</h2>
    </div>
  );

}

export default App;
