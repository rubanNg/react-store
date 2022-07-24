import { appStore } from "./example"
import { useStore } from '../src/index'
import React  from "react";

function Component() {

  const store = useStore(appStore);


  function addUser() {
    store.addUser(Math.trunc(Math.random()).toString())
  }

  function removeUser(user: string) {
    store.removeUser(user);
  }

  return <>
    <p><button onClick={addUser}>add user</button></p>
    <ul>
      { 
        store.users.map(s => (
          <li>
            <div>
              { s }
              <button onClick={() => removeUser(s)}>remove user</button>
            </div>
          </li>
        )) 
      }
    </ul>
  </>
}