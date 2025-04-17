import React from 'react';

export function TodoCard(props) {
    const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo } = props;

    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <p>Time: {todo.time}</p> {/* Display the time */}
            <div className="todo-buttons">
                <button onClick={() => handleCompleteTodo(todoIndex)} disabled={todo.complete}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => handleDeleteTodo(todoIndex)}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    );
}
