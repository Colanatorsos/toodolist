import React, { useState } from "react";
import Button from "../Button";

function Todo({
    task,
    idx,
    showButtons,
    onSaveTask,
    onCompleteTask,
    onRemoveTask,
    onToggleButtons,
}) {
    const [isEditable, setIsEditable] = useState(false);
    const [editedTaskText, setEditedTaskText] = useState(task.text);

    const handleEditTask = () => {
        setIsEditable(true);
        setEditedTaskText(task.text);
    };

    const handleSaveTask = () => {
        onSaveTask(idx, editedTaskText);
        setIsEditable(false);
    };

    const handleCompleteClick = () => {
        onCompleteTask(idx);
    };

    return (
        <li key={idx} style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column' }}>
            <span style={{ minWidth: "100px" }}>{task.createdAt}</span>
            <span style={{ minWidth: "300px", textDecoration: task.isCompleted ? "line-through" : "none" }}>{task.text}</span> 
            {showButtons ? (
                <>
                    <Button onClick={handleCompleteClick}>
                        {task.isCompleted ? "Отменить выполнение" : "Завершить"}
                    </Button>
                    <Button onClick={handleEditTask}>Изменить</Button>
                    <Button onClick={() => onRemoveTask(idx)}>Убрать</Button>
                    <Button onClick={() => onToggleButtons(-1)}>Скрыть</Button>
                </>
            ) : (
                <Button onClick={() => onToggleButtons(idx)}>Toolbar</Button>
            )}
            {isEditable ? (
                <>
                    <input
                        type="text"
                        value={editedTaskText}
                        onChange={(e) => setEditedTaskText(e.target.value)}
                    />
                    <Button onClick={handleSaveTask}>Сохранить</Button>
                </>
            ) : null}
        </li>
    );
}

export default Todo;
