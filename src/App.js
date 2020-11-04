import React, {useState, useEffect} from 'react';

import api from './services/api';

import {uuid} from 'uuidv4';

import "./styles.css";

function App() {
  
  const [ project, setValues ] = useState([]); 

  

  useEffect(() => {

      api.get('/repositories').then(response => {
          //console.log(response.data);
          setValues(response.data);

      });
  }, []);

   

  

  async function handleAddRepository() {
    
    var new_value = `New publisher-${Date.now()}`;
    //id: uuid(),
     const response = await api.post('repositories', {
        title:new_value,
        url:"https://maisaquihost.com.br/rec",
        techs: ["React js", "React Native", "php"]

     });

     setValues([...project, response.data]);
    
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`);

    //const posion_id = project.findIndex(position => position.id === id);
    
    //project.splice(posion_id, 1);
    setValues(project.filter(position => position.id !== id));
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
      {project.map(values => {
          return (
            <li key={values.id}>
              {values.title}

              <button onClick={() => handleRemoveRepository(values.id)}>
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
