import React, { useState } from "react";
import Button from "../Button";

function Form({ handleInputChange, handleAddTask, onInputChange, inputValue, onAddTask }) {
    return (
        <div>
            <form onSubmit={handleAddTask} >
                <input style={{}}
                    type="text"
                    value={inputValue}
                    onChange={onInputChange}
                    placeholder="Введите название" />
                <Button onClick={onAddTask}>Добавьте задание</Button>
            </form>
        </div>
    );
}

export default Form;
