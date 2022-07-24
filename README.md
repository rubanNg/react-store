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

  const { addUser, removeUser, users }  = useStore(appStore);


  function _addUser() {
    addUser(Math.trunc(Math.random() * 10000).toString())
  }

  function _removeUser(user: string) {
    removeUser(user);
  }

  return <>
    <p><button onClick={_addUser}>add user</button></p>
    <ul>
      { 
        users.map(s => (
          <li>
            <div>
              { s }
              <button onClick={() => _removeUser(s)}>remove user</button>
            </div>
          </li>
        )) 
      }
    </ul>
  </>
}
```
