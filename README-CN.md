# react-model-store

React-model-store 是一个易于使用的状态管理工具。


```javascript
import { store } from 'react-model-store';

// 首先需要声明一个对象作为 model
// model 包含三部分：
// name - model 的名称，后面会作为 useModel 的参数
// value - model 的数据部分，通过函数 getValue 返回，且 value 必须是个对象
// method - 操作 value 的方法
const UserModel = {
  name: 'user',

  getValue() {
    return {
      name: '',
      age: 0
    };
  },

  // 除了 name 和 getValue 之外的属性，是函数类型的会被当作 method 处理
  // 非函数类型的会被忽略
  // method 的第一个参数是个对象，包含了对 value 部分的操作，如：set, get 等
  // 之后的参数则依次是调用该 method 时传入的参数
  setName({ set }, newName) {
    set({ name: newName });
  },

  addAge({ set, get }, num = 1) {
    // 若 get 方法不传字段名，则会返回整个 value
    set({ age: get('age') + num });
  }
};

// 将 model 添加到 store 中
store.add(UserModel);

// 如果有多个 model 需要添加，可以使用 addAll 方法
store.addAll([
  UserModel
]);

```

### 在函数组件中使用
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

### 在 class 组件中使用
即将到来