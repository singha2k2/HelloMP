
import React, { useState, useEffect } from 'react';
import icon from "./images/icon.png"
import "./Todo.css"
import './Todo.css'; 
import NavbarComponent from '../navbar/navbar';

function ToDoListApp() {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('data');
        if (data) {
            setTasks(JSON.parse(data));
        }
    }, []);

    const addTask = () => {
        if (inputValue.trim() === '') {
            alert("You must write something!!");
            return;
        }

        const newTask = { text: inputValue, id: Date.now() };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setInputValue('');
        saveData([...tasks, newTask],"addTask");
    };

    const toggleTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
        saveData(tasks,"toggle");
    };

    const removeTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        saveData(tasks.filter(task => task.id !== id),"remove");
    };

    const saveData = (data,s) => {
        console.log(data,s)
        localStorage.setItem('data', JSON.stringify(data));
    };

    return (
        <>
       
        <div className="todocontainer">
            <div className="todo-app">
                <h2>Work Tracker <img src={icon} alt="icon" /></h2>
                <div className="toDo-row">
                    <input
                        type="text"
                        id="input-box"
                        placeholder="Add your Work"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={addTask}>Add</button>
                </div>
                <ul id="list-container">
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            className={task.completed ? "checked" : ""}
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.text}
                            <span  onClick={(e) => {
                                e.stopPropagation()
                                removeTask(task.id)}}>&times;</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default ToDoListApp;
