import { React, useState, useEffect } from "react";
import axios from "axios"

function App() {
  const [data,setData] = useState()
  
  useEffect(()=>{
    async function grabData(){
      const response = await axios.get("http://localhost:3000/posts")    // always verify the url
      if(response.status === 200){
        setData(response.data)
      }
    }

    grabData()
  },[])
  
  return (
    <>
      <div>
        {JSON.stringify(data)}
      </div>
    </>
  );
}

export default App;
