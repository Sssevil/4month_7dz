import React, {useEffect, useState} from 'react';

function TodosPage() {

    const [todos, setTodos]= useState([])
    const [input,setInput]=useState('')
    async function getTodos(){
        const response= await fetch('http://localhost:8000/todos')
        const data = await response.json()

        setTodos(data)
    }

    async function createTodo(event){
        event.preventDefault()
        setInput('')
        const todo = {
            title:input,
            status: false
        }

        const  response = await fetch('http://localhost:8000/todos', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(todo)
        })

        if (response.ok){
            getTodos()
        }
    }

    async function deleteTodo (id){
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method:"DELETE"
        })

        if (response.ok){
            getTodos()
        }
    }

    async function changeStatus (id,status){
        const todo = {
            status:status
        }

        const response = await fetch(`http://localhost:8000/todos/${id}`,{
            method:'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(todo)
        })

        if (response.ok){
            getTodos()
        }
    }

    async function updateTodo (id){
        setInput('')
        const todo = {
            title:input,
            status:false
        }

        const  response = await fetch(`http://localhost:8000/todos/${id}`, {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(todo)
        })

        if (response.ok){
            getTodos()
        }
    }

    useEffect(()=>{
        getTodos()
    },[])


    return (
        <div style={{padding:30}}>
            <h1>Todos</h1>

            <form onSubmit={createTodo}>
                <input  value={input} type="text" onChange={(event)=>setInput(event.target.value)}/>
                <button>create todos </button>
            </form>
            {
                todos.map(todo =>
                    <p key={todo.id} className={todo.status ? 'line' : ''}>
                        <input type="checkbox"
                               checked={todo.status}
                               onChange={(event)=> changeStatus(todo.id, event.target.checked) }/>
                            {todo.title}
                        <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
                        <button onClick={()=> updateTodo(todo.id)}>update</button>
                    </p>)
            }
        </div>
    );
}

// json-server --watch db.json -p 8000
export default TodosPage;