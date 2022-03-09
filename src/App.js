import './App.css';
import { Card, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [users, setUsers] = useState("");
  const [searchedUser, setSearchedUser] = useState("");
  const [findUser, setFindUser] = useState("");

  useEffect(() => {
    axios.get("https://api.github.com/users").then((res) => setUsers(res.data)).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (searchedUser) {
      axios.get(`https://api.github.com/users/${searchedUser}`).then((res) => setFindUser(res.data)).catch((err) => console.log(err));
    }
  }, [searchedUser]);
  
  return (
    <div className="App">
      <h1>Git Repositories</h1>
      <label htmlFor="gsearch">Search Repos: </label>{" "}
      <input type="search" id="gsearch" name="search" placeholder='Search' onChange={(e) => setSearchedUser(e.target.value)}></input>

      {!searchedUser && users && users.map((user) => 
        <Card key={Math.random()}>
          <Card.Header>{user.name}</Card.Header>
          <Card.Body>
            <Card.Title>{user.login}</Card.Title>
            <Card.Text>
              {user.repos_url}
            </Card.Text>
            <Image
              src={user.avatar_url}
              rounded
            />
          </Card.Body>
        </Card>
      )}
      
      {findUser && 
        <Card>
          <Card.Header>{findUser.name}</Card.Header>
          <Card.Body>
            <Card.Title>{findUser.login}</Card.Title>
            <Card.Text>
              {findUser.repos_url}
            </Card.Text>
            <Image
              src={findUser.avatar_url}
              rounded
            />
          </Card.Body>
        </Card>
      }
    </div>
  );
}

export default App;
