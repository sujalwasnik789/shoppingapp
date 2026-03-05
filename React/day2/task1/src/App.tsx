import './App.css';
import {useState} from "react";
interface GreetingProp{
  name:string;
}
function App() {
  const[name,setname]=useState<string>("");

return(
  <div>
    <h1>Greeting Card</h1>
    <input
    type="text"
    value={name}
    onChange={(e)=>setname(e.target.value)}
    placeholder='enter your name'

    />
    <GreetingCard name={name}/>
  </div>
);
}
function GreetingCard({name}:GreetingProp){
  const displayName=name.trim()||"stranger";
  return(
    <div>
      <h2>Hello,{displayName}!</h2>
    </div>
  );

}

export default App;
