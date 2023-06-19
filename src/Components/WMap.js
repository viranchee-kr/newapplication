import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

function App() {
    const [country, setCountry] = useState([]);
    const [selectData, setSelectData] = useState()

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => {
                setCountry(res.data)
            })  
    }, [])
    const search = country.find((posts) => {
        if (posts.name.common === selectData) {
            return true;
        }
        return false;
    })
    return (
        <Container className="content">
            <div className="row">
                <div className="col-sm-12">
                    <div className="row mb-3">
                        <div className="form-group col-md-4">
                            <label className="mb-2" style={{marginLeft:"33%" , color:"red"}}><h2>Country</h2></label>
                            <select
                                name="country"
                                className="form-control"
                                onChange={(e) => setSelectData(e.target.value)}
                            >
                                <option>--Select Country--</option>
                                {
                                    country.map((post) => {
                                        return <option 
                                        value={post.name.common}>
                                        {post.name.common}
                                        </option>
                                    })
                                }

                            </select>
                        </div>

                        {search && 
                        <div>
                        <ul>
                          
                            <h5>
                            <p><img src={search.flags.png }></img></p>
                          <p>Country: {search.name.common}</p>
                          <p>Country Capital: {search.capital}</p>
                          <p>Currencies: {(search.currencies[Object.keys(search.currencies)].name)}</p>
                          <p>Languages: {Object.values(search.languages).join(", ")}</p>
                          <p>continents: {search.continents}</p>
                          <p>population:{search.population}</p>
                          <p>Country Code:{search.idd.root+search.idd.suffixes}</p>
                          </h5>
                         
                        </ul>
                        </div>
                        
                        }
                    </div>

                </div>
            </div>
        </Container>
    );
}
export default App;