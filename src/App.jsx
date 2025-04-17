import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";

import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', time: '12:00', complete: true, id: Date.now() }
  ]);
  const [selectedTab, setSelectedTab] = useState('Open');

  // Ask for notification permission on app load
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  function scheduleBrowserNotification(task, time) {
    const [hours, minutes] = time.split(':');
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);
  
    const delay = reminderTime - now;
    if (delay <= 0) return;
  
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        const notification = new Notification('Task Reminder', {
          body: `Don't forget: ${task} is due now!`,
          icon: '/reminder-icon.png', // optional
          data: { url: "https://dailydoes.netlify.app/" }, 
        });
  
        notification.onclick = (event) => {
          event.preventDefault();
          window.focus();
          window.open(notification.data.url, '_blank');
        };
      }
    }, delay);
  }
  

  function handleAddTodo(newTodo, time) {
    const newTodoList = [
      ...todos,
      { input: newTodo, time, complete: false, id: Date.now() }
    ];
    setTodos(newTodoList);
    handleSaveData(newTodoList);

    scheduleBrowserNotification(newTodo, time); // Schedule the notification
  }

  function handleCompleteTodo(index) {
    const newTodoList = todos.map((todo, i) =>
      i === index ? { ...todo, complete: true } : todo
    );
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, valIndex) => valIndex !== index);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }));
  }

  useEffect(() => {
    const storedData = localStorage.getItem('todo-app');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setTodos(parsedData.todos || []);
    }
  }, []);

  const filterTodosList = selectedTab === 'All'
    ? todos
    : selectedTab === 'Completed'
    ? todos.filter(todo => todo.complete)
    : todos.filter(todo => !todo.complete);

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
        selectedTab={selectedTab}
        todos={filterTodosList}
      />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  );
}

export default App;
