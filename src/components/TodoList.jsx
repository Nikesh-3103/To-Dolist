import React from 'react';
import { TodoCard } from './TodoCard'; // Import TodoCard component

export function TodoList(props) {
    const { todos, handleCompleteTodo, handleDeleteTodo } = props;

    return (
        <>
            {todos.map((todo, todoIndex) => (
                <TodoCard
                    key={todo.id} // Use unique key (task ID)
                    todo={todo}
                    todoIndex={todoIndex}
                    handleCompleteTodo={handleCompleteTodo}
                    handleDeleteTodo={handleDeleteTodo}
                />
            ))}
        </>
    );
}
