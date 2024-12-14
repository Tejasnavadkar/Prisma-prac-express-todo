import { useEffect, useState } from "react"
import Input from "./Input"
import axios from "axios"
import { useLocation } from "react-router-dom"


interface Todo {
    id:number,
    title:string,
    description:string
}

function HomePage(){

   const location = useLocation()

   const [title,setTitle] = useState("")
   const [description,setDescription] = useState("")
   const [allTodos,setAlltodos] = useState<Todo[] | null>(null)

    const FetchTodos = async ()=>{
  const todos= await axios.get("http://localhost:3000/api/v1/todos/getTodos",{
        params:{
            user_id:location.state.id
        },
        headers:{
            authorization:"bearer " + localStorage.getItem('token')
        }
    })

    if(todos.data.allTodos.length > 0){
        console.log("alltodoshere----",todos)
        setAlltodos(todos.data.allTodos)
    }else{
        console.log("no todos")
    }
}


const createTodo = async ()=>{

    await axios.post("http://localhost:3000/api/v1/todos/createTodo",{
     title:title,
     description:description,
     user_id:location.state.id
 
    },{
     headers:{
         authorization:"Bearer " + localStorage.getItem('token')
     }
    })
 
    }

   useEffect(()=>{
    FetchTodos()
    console.log("currentuser",location.state?.id)
   },[])

 

    return <>
    
    <div className="bg-slate-500 w-full h-screen flex-col flex items-center">
        <div className="flex mt-32 px-3 ">
            <Input onChange={e=>setTitle(e.target.value)} placeholder="Title" classname="px-2"/>
            <Input onChange={e=>setDescription(e.target.value)} placeholder="Description" classname="px-2"/>
            <div className="w-full  ">
           <button onClick={createTodo} type="button" className=" w-full py-2.5 px-5 me-2 mb-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add Todo</button>
            </div> 
        </div>

        <div className="flex flex-col mt-8 gap-3">
            {allTodos ? allTodos.map((todo:Todo):any=>(
            <div className="flex gap-2 justify-center items-center" key={todo.id}>
                <span className="font-semibold text-2xl">{todo.title}</span>
                <span className="font-semibold text-2xl">{todo.description}</span>
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </div>

            )): "noTodos"}
            {/* <div className="flex gap-2 justify-center items-center">
                <span className="font-semibold text-2xl">Title</span>
                <span className="font-semibold text-2xl">Description</span>
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </div> */}
        </div>
    </div>

    </>
}

export default HomePage

