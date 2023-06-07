import './App.css'

import { useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth"
import { auth, dataBaseApp } from "./services/firebaseConfig";
import { collection, orderBy, query, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useState } from 'react';

export const App = () => {

  const [user] = useAuthState(auth);

  return(
    <div className="App">
      <header>
        <h1>React Chat</h1>
        <SiginOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />} 
      </section>
    </div>
  )
}


export const ChatRoom = () => {

  const messageRef = collection(dataBaseApp, "messages");
  const QueryMessages = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(QueryMessages, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) =>{
    e.preventDefault();

    const { photoURL, uid } = auth.currentUser;

    await addDoc(messageRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp(),
    });
    setFormValue("");
  };

  return(
    <>

      <main>
        {messages && messages.map((msg, index) => (<ChatMessage key={index} message={msg} />))}
      </main>
      <form onSubmit={sendMessage}>
        <input type="text"  value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button>Enviar</button>
      </form>

    </>
  )
}

export const ChatMessage = (props) => {

  const {text, photoURL, uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="photo" />
      <p>{text}</p>
    </div>
  )
}


export const SignIn = () => {

  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return(
    <button className='sign-in' onClick={() => signInWithGoogle()}>Logar com Google</button>
  )
}


export const SiginOut = () => {
  return(
    auth.currentUser && <button className='sign-out' onClick={() => auth.signOut()}>Sair</button>
  )
}
