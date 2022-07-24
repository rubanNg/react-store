```javascript

// CREATE STORE
import { Store, createStore } from '../src/index'

class AppStore extends Store<{ users: string[] }> {


  constructor() {
    // set initial state
    super({ users: [] });
  }


  selectors = {
    users: this.get(s => s.users)
  };
  actions = {
    addUser: (user: string) => {
      this.set(s => s.users.push(user))
    },
    removeUser: (user: string) => {
      this.set((s) => {
        s.users = s.users.filter(s => s !== user);
      })
    }
  };
  
}

export const appStore = createStore(new AppStore());


// USAGE IN COMPONENT
import { appStore } from "./example"
import { useStore } from '../src/index'
import React  from "react";

function Component() {

  const store = useStore(appStore);


  function addUser() {
    store.addUser(Math.trunc(Math.random() * 10000).toString())
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
```
