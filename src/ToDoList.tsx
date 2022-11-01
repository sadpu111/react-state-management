import React, { ReactElement, useState } from "react";
import {useForm} from "react-hook-form"; // 호출 대상을 중괄호로 안묶으면 호출 안됨(not callable)

/* function ToDoList() {
  const [todo, setTodo] = useState("");
  const [todoerror, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
    setToDoError("");
  };
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.length < 10) {
      return setToDoError("Please Enter a longer todo...");
    }
    console.log(todo);
  };
  return <div>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={todo} placeholder="Enter a todo"></input>
      <button>add</button>
      {todoerror !== "" ? todoerror : null}
    </form>
  </div>
  } */

function ToDoList() {
  const {register, watch} = useForm(); // react-hook에서 제공하는 register 함수
  console.log(watch())
  return (
    <div>
      <form>
        <input {...register("todo")} placeholder="Enter a todo"></input>
        <button>add</button>
      </form>
    </div>)
}

export default ToDoList;