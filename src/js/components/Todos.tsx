import React from 'react'
import { useState } from 'react';
import styles from '../../css/Todos.module.css';

function Todos() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // typescriptはインターフェースとして再利用可能なオブジェクトの型を宣言できる
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しいTodoを作成
    // 定義済みのTodo型を指定
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false
    }

    setTodos([newTodo, ...todos]) // 新規作成したTodoをstateで管理しているtodosに追加 スプレッド構文を使用する
    setInputValue('');
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className={styles.App}>
      <div>
        <h2>Todo list with Typescript</h2>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input value={inputValue} type="text" onChange={(e) => handleChange(e)} className={styles.inputText}/>
          <input type="submit" value="作成" className={styles.submitButton} />
        </form>
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className={styles.inputText}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
              />
              <button className={styles.submitButton} onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todos
