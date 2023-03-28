import { useState } from "react";

function Search(props) {
    const [searchTerm,  setSearchTerm] = useState(''); 
    //it takes the initial state and returns an array with 2 items in it:
    //the value of the state and the function we need to use to change this state
    //the array has parametres inside

   // console.log(`Rendering: ${searchTerm}`)
    //the searchTerm is changed (=the new value is added) AFTER we have completed handleChange() and rerendered the componened

    const handleChange = (event) => {
       // console.log(`Before rerendering: ${searchTerm}`)
        setSearchTerm(event.target.value);//we call the function and
        // give it the the new value of searcTerm from the event
        //buy calling this function we rerender the component -and the state changes
        //console.log(event) //this is a syntheticBaseEvent
        //this function is called only after you change values in your browser
       // console.log(`After rerendering: ${searchTerm}`)
        props.onSearch(event);
    };

    // const handleMouseOver = (event) => {
    // console.log(event)
    // }

    return (
    <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={handleChange} />
        {/* <input id="search" type="text" onChange={handleChange} onMouseOver={handleMouseOver}/> */}
        {/* we can't write  {handleChange()},
        because in this case instead if putting a reference to handleChange 
        it puts a reference to whatever gets returned. In case we have 
        a console.log, nothing gets returned (undefined)- no actions. We need a reference
        to the function to envoke it, not to the results of that function.
        */}

        <p>
            Seaching for <strong>{searchTerm}</strong> 
            {/* state info */}
        </p>
    </div>
    )
}

export default Search;