"use client";

import { useState } from "react";
// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import { getUrl } from "aws-amplify/storage";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";

Amplify.configure(outputs);

// const client = generateClient<Schema>();

export default function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // function listTodos() {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }

  // useEffect(() => {
  //   listTodos();
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({
  //     content: window.prompt("Todo content"),
  //   });
  // }

  const [pathUrl, setPathUrl] = useState<string | null>();

  const hadleUploadFile = async ($event: { key?: string }) => {
    const response = await getUrl({
      path: $event.key!,
    });

    setPathUrl(response.url.href);
  };

  const handleSession = async () => {
    const session = await fetchAuthSession();
    if (session === undefined) return;
    console.log("id token", session.tokens!.idToken);
    console.log("access token", session.tokens!.accessToken);
  };

  if (pathUrl)
    return (
      <Image
        src={pathUrl}
        alt="imagen"
        width={500}
        height={700}
        className="object-fit"
      />
    );

  // return (
  //   <FileUploader
  //     acceptedFileTypes={["image/*", "video/*", "application/pdf"]}
  //     path="task-pictures/d4483b1f-4407-4f0e-8616-bc09d593089b/"
  //     maxFileCount={1}
  //     isResumable
  //     onUploadSuccess={($event) => hadleUploadFile($event)}
  //   />
  // );
  const formFields = {
    signUp: {
      email: {
        order: 1,
      },
      username: {
        order: 2,
      },
      phone_number: {
        order: 3,
      },
      password: {
        order: 4,
      },
      confirm_password: {
        order: 5,
      },
    },
  };
  return (
    <Authenticator
      formFields={formFields}
      socialProviders={["amazon", "apple", "facebook", "google"]}
    >
      {({ signOut, user }) => (
        <main>
          <button onClick={handleSession}>Get Token</button>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
