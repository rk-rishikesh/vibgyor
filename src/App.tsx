import { Accordion } from "./components";
import { Login } from "./components/login/login";
import { Mint } from "./components/mint/Mint";
import { Profile } from "./components/profile/Profile";
import { useState } from "react";
import "./App.css";

const App = () => {
    
    const [page, setPage] = useState(0);

    const handlePage = (page:number) => {
        setPage(page);
      }

    return (
        <>
        <ul>
        <li><a onClick={() => handlePage(0)}>Login</a></li>
        <li><a onClick={() => handlePage(1)}>Mint</a></li>
        <li><a onClick={() => handlePage(2)}>Vibgyor</a></li>
        <li><a onClick={() => handlePage(3)}>Profile</a></li>
      </ul>
      <div className="body">
      {page == 0 && <Login/>}
      {page == 1 && <Mint/>}
      {page == 2 && <Accordion/>}
      {page == 3 && <Profile/>}
      </div>
      </>

    );
    
}

export default App;
