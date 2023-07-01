# react-model-store

![Static Badge](https://img.shields.io/badge/React->=16.8.0-blue)
![Static Badge](https://img.shields.io/badge/version-0.0.1)

React-model-store is an easy-to-use state management tool for React.


```javascript
import { store } from 'react-model-store';

// First, you need to declare an object as a model
// The model includes three parts：
// name - Model's name, it will be used as an argument to hook 'useModel'
// value - The data part of the model is returned by the function 'getValue', and it must be an object
// method - Methods for manage value
const UserModel = {
  name: 'user',

  getValue() {
    return {
      name: '',
      age: 0
    };
  },

  // Properties other than 'name' and 'getValue', function type will be treated as a method
  // Non-function types will be ignored
  // The first parameter of the method is an object containing the operations on the value part, such as: set, get, etc.
  // The subsequent parameters are, in order, the parameters passed in when the method is called
  setName({ set }, newName) {
    set({ name: newName });
  },

  addAge({ set, get }, num = 1) {
    // If the get method does not pass a field name, the entire value will be returned
    set({ age: get('age') + num });
  }
};

// Adding the model to the store
store.add(UserModel);

// If you have more than one model to add, you can use the 'addAll' method
store.addAll([
  UserModel
]);

```

### Use in function components
```javascript
import { useModel } from 'react-model-store';

export default function User() {
  const user = useModel('user');

  return <div>
    <div>name {user.name}</div>
    <input type="text" onChange={(e) => {
      user.setName(e.target.value);
    }} />

    <div>age {user.age}</div>
    <button onClick={() => {
      user.addAge();
    }}>Add age</button>
  </div>
}
```

### Use in class components
coming soon