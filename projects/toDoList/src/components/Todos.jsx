import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../features/todo/todoSlice';

function Todos() {
    const todos = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Your Tasks</h2>
            <ul className="list-none">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="mt-4 flex justify-between items-center bg-gray-800 px-4 py-2 rounded shadow-md hover:bg-gray-700 transition duration-300"
                    >
                        <div className='flex items-center gap-3'>
                            <input 
                                type="checkbox" 
                                checked={todo.completed}
                                onChange={() => dispatch(toggleTodo(todo.id))}
                                className="w-5 h-5 cursor-pointer"
                            />
                            <span className={`text-white ${todo.completed ? "line-through text-gray-400" : ""}`}>
                                {todo.text}
                            </span>
                        </div>
                        
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md ml-4"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todos;