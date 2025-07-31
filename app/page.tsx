"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { uploadData } from "aws-amplify/storage";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  const [file, setFile] = useState<File | null>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const files = input.files as FileList;
    if (!files.length) return;
    const file = files[0];
    setFile(file);
  };

  const handleClick = () => {
    if (!file) {
      return;
    }
    uploadData({
      path: `task-pictures/${file.name}`,
      data: file,
    });
  };

  // return (
  //   <main>
  //     <h1>My todos</h1>
  //     <button onClick={createTodo}>+ new</button>
  //     <ul>
  //       {todos.map((todo) => (
  //         <li key={todo.id}>{todo.content}</li>
  //       ))}
  //     </ul>
  //     <div>
  //       🥳 App successfully hosted. Try creating a new todo.
  //       <br />
  //       <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
  //         Review next steps of this tutorial.
  //       </a>
  //     </div>

  //   </main>
  // );

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload</button>
    </div>
  );
}
