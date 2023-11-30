import React, {useState} from "react";
import {Input, InputGroup, InputGroupText} from 'reactstrap'; 
import axios from "axios";


const fetchSearch: React.FC = (searchQuery): void => {
    axios.put("/search/query", searchQuery);

}

const Search: React.FunctionComponent = (): JSX.Element => {
    
    const [searchValue, setSearchValue] = useState(""); // State to store the input value
    
    function handleSearchClick() {
           
            // Make a GET request using Axios
        axios.get(`http://localhost:8000/search/${searchValue}`)
            .then(response => {
                // Handle the response data from the backend
                console.log("Data from backend:", response.data);
            })
                .catch(error => {
                    // Handle any errors that occur during the request
                    console.error("Error fetching data:", error);
                });
            
            // Clear the input field after searching (if needed)
            setSearchValue("");
    }
  
return( 
    <div>
        <div>
            <> </>
            <> </>
        </div>

        <InputGroup size="mg">
            <InputGroupText>
                <button onClick={handleSearchClick}> Search </button>
           </InputGroupText>
            <Input 
                placeholder="Search by Name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </InputGroup>
    </div>
  );
}

export default Search;