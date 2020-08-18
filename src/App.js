import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    const repository = repositories.filter(item => item.id !== id)

    setRepositories(repository);


  }

  return (
    <div>

      <ul data-testid="repository-list">

        {repositories.map(repositoyry => {
          return (
            <li key={repositoyry.id}>
              {repositoyry.title}
              <button onClick={() => handleRemoveRepository(repositoyry.id)}>
                Remover
            </button>
            </li>
          )

        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
