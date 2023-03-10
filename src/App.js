import React from "react";

//const title = "React"


function getTitle(title) {
  return title;
}
//We envoke a function and get back a result.
function App() {
  return (
    <div>
      <h1>Hello {getTitle("react")}</h1>
      {/* <h1>Hello {title}</h1> */}
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
