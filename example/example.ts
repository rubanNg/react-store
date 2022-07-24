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