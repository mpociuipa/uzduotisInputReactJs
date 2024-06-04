import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialTasks = [
    { id: 1, title: 'Pirmoji užduotis', description: 'Aprašymas pirmajai užduočiai', priority: 'svarbu' },
    { id: 2, title: 'Antra užduotis', description: 'Aprašymas antroji užduočiai', priority: 'nesvarbu' },
    { id: 3, title: 'Trečia užduotis', description: 'Aprašymas trečiai užduočiai', priority: 'skubu' },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({ title: '', description: '', priority: 'nesvarbu' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, task]);
    setTask({ title: '', description: '', priority: 'nesvarbu' });
    setShowForm(false);
  };

  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container">
      <button onClick={() => setShowForm(true)}>Pridėti naują užduotį</button>
      {tasks.length > 0 && (
        <input 
          type="text" 
          placeholder="Ieškoti užduočių..." 
          value={searchTerm} 
          onChange={handleChange} 
        />
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Užduoties pavadinimas:</label>
            <input 
              type="text" 
              name="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required 
            />
          </div>
          <div>
            <label>Aprašymas:</label>
            <textarea 
              name="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            ></textarea>
          </div>
          <div>
            <label>Prioritetas:</label>
            <select 
              name="priority" 
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="nesvarbu">Nesvarbu</option>
              <option value="svarbu">Svarbu</option>
              <option value="skubu">Skubu</option>
              <option value="neskubu">Neskubu</option>
            </select>
          </div>
          <button type="submit">Saugoti</button>
        </form>
      )}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Prioritetas: {task.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


