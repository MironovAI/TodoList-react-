import React, { useEffect } from "react"
import TodoList from './Todo/TodoList'
import Context from "./context"
import Loader from "./loader"
import Modal from "./modal/modal"

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        // эмитация задержки с серверва 
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, []) 
  

function toggleTodo(id) {
  setTodos(
    todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo
  }))
}

function removeTodo(id) {
  setTodos(todos.filter(todo => todo.id !== id))
}
function addTodo(title) {
  setTodos(
    todos.concat([
      {
      title,
      id: Date.now(),
      completed: false
      }
    ])
  ) 
}


  return (
    <Context.Provider value ={{removeTodo: removeTodo}}>
      <div className='wrapper' >
        <h1>TodoList</h1>
        <Modal />
        <React.Suspense fallback={<p>loading</p>}>
         <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        
        {loading && <Loader/>}
        {todos.length ? (
        <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
         <p>No todos!</p>
        )}
      </div>
   </Context.Provider>
  );
}

export default App;
