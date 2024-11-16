import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [maxLength, setMaxLength] = useState('');
  const [catFacts, setCatFacts] = useState([]);
  const [error, setError] = useState(null);
  const [statusInfo, setStatusInfo] = useState(null)

  // Handles input changes
  const handleChange = (e) => {
    setMaxLength(e.target.value);
  };

  // Handles search click to get status info
  const handleSearch = async () => {

    console.log(maxLength);

    if (!maxLength > 0) {
      setError("Please enter a Maximum Length.");
    }


    setError(null); // Clear previous error
    try {
      const response = await axios.get(`https://catfact.ninja/facts?limit=${maxLength}`);

      if (!response.status == 200) {
            setError("Network response was not ok");
          }

      // destructure the data from the response
      const { data } = response.data
      console.log(response.data);

      setCatFacts(data);
    } catch (err) {
      setError("Could not retrieve information. Please check the status code.");
      setStatusInfo(null);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Cat Facts</h1>
      <input
        type="number"
        placeholder="Enter the number of cat facts you'd like"
        value={maxLength}
        onChange={handleChange}
        style={{ padding: '8px', width: '100%' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px', marginTop: '10px', width: '100%' }}>
        Search
      </button>

        { /* TODO: Display error message if there is an error */}

        { /* TODO: Display facts if it exists */}
        {!error == null && <h2>{setError}</h2>}
        {!catFacts.length == 0 ?

          <div style={{ marginTop: '20px' }}>
            <h2>Here are {catFacts.length} Cat Facts</h2>
            <ul>
              {catFacts.map((fact, index) => (
                <li key={index}>{fact.fact}</li>
              ))}
            </ul>
          </div>
        : <div style={{ marginTop: '20px' }}>
            <h2>There are no cat facts to display!</h2>
          </div>
        }

    </div>
  );
}

export default App;
