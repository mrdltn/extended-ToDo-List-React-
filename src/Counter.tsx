import { useState } from "react";

//////локальный state, без props
function Counter() {
    // debugger
    console.log('Count rendered...');
    
    let arr = useState(4);
    let data = arr[0];
    let setData = arr[1];

    return <div onClick={() => {setData(data+1)}}>{data}</div>
  }

export default Counter;