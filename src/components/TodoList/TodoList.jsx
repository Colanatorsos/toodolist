import React, { useEffect, useState } from "react";
import Todo from "../Todo";
import Form from "../Form";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTaskid, setEditTaskid] = useState(-1);
    const [editTaskText, seteditTaskText] = useState("");
    const [showButtonsIdx, setShowButtonsIdx] = useState(-1);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'))
        setTasks(todos)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(tasks))
    }, [tasks])

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
        e.preventDefault();
    };

    const handleAddTask = (e) => {
        if (newTask !== "") {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setTasks([...tasks, { text: newTask, isCompleted: false, createdAt: currentTime }]);
            setNewTask("");
        }
        e.preventDefault();
    };

    const handleRemoveTask = (idx) => {
        const updTasks = tasks.filter((e, i) => i !== idx);
        setTasks(updTasks);
    };

    const handleCompleteTask = (idx) => {
        const updTasks = tasks.map((task, i) =>
            i === idx ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setTasks(updTasks);
    };

    const handleEditTask = (idx) => {
        setEditTaskid(idx);
        seteditTaskText(tasks[idx].text);
    };

    const handleSaveTask = (idx, newText) => {
        const updTasks = tasks.map((task, i) =>
            i === idx ? { ...task, text: newText } : task
        );
        setTasks(updTasks);
        setEditTaskid(-1);
    };

    const handleToggleButtons = (idx) => {
        setShowButtonsIdx(idx);
    };


    const tasksGroups = [];
    for (let i = 0; i < tasks.length; i += 7) {
        tasksGroups.push(tasks.slice(i, i + 7));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: 'column' }}>
            <h1>Ту-ду лист</h1>
            <Form
                onInputChange={handleInputChange}
                inputValue={newTask}
                onAddTask={handleAddTask}
            />
            <div style={{ marginTop: '100px', display: "flex" }}>
                {tasksGroups.map((group, groupIndex) => (
                    <div key={groupIndex} style={{ margin: "0 20px" }}>
                        {group.map((task, idx) => (
                            <Todo
                                key={idx}
                                task={task}
                                idx={idx + groupIndex * 7}
                                showButtons={showButtonsIdx === idx + groupIndex * 7}
                                editTaskText={editTaskText}
                                onEditTask={handleEditTask}
                                onSaveTask={handleSaveTask}
                                onCompleteTask={handleCompleteTask}
                                onRemoveTask={handleRemoveTask}
                                onToggleButtons={handleToggleButtons}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
