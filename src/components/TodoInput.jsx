import { useState } from 'react';

export function TodoInput(props) {
  const { handleAddTodo } = props;
  const [inputValue, setInputValue] = useState('');
  const [timeValue, setTimeValue] = useState('');  // Added state for time input

  return (
    <div className="input-container">
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Add task" 
      />
      <input 
        type="time" 
        value={timeValue} 
        onChange={(e) => setTimeValue(e.target.value)} 
        placeholder="Set time" 
      />
      <button onClick={() => {
        if (!inputValue || !timeValue) { return; }
        handleAddTodo(inputValue, timeValue);
        setInputValue('');
        setTimeValue('');
      }}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
