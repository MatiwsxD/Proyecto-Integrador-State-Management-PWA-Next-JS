import React, { useState, useEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";



function Tasks() {
  const { state, dispatch } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getData();
    }, []);

  async function getData() {
    sala = sessionStorage.getItem("Sala")
    //console.log(sala);
    let url = "http://localhost:8080/v1/tasks"
    let players = await fetch(url, {
        method: 'GET'
    }).then(response => response.json());

    setTasks(players);
    
};

  function listProducts() {
    if (tasks) {
      return tasks.map((task) => {
        return (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.descripcion}</td>
            <td>{task.status}</td>
            <td>{task.assignedTo}</td>
            <td>{task.dueDate}</td>
            <td>{task.createdAt}</td>
          </tr>
        );
      });
    }
  }

  return (
    <div>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>Asignado</th>
                <th>Fecha Terminacion</th>
                <th>Fecha Creacion</th>
              </tr>
            </thead>
            <tbody>{listProducts()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tasks;