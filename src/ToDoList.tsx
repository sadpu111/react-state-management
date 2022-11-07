import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form"; // 호출 대상을 중괄호로 안묶으면 호출 안됨(not callable)

interface IFormData {
  [key:string]: string;
  } // index signature 선언

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
  const { register, watch, handleSubmit, formState: { errors } } = useForm<IFormData>(); // react-hook에서 제공하는 함수(watch:form의 입력값 추적, handleSubmit: onSubmit 대체)
  const onValid = (data: any) => {
    console.log(data);
  }
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", {
          required: true, pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: "only naver email allowed..."
          },
        })} placeholder="Email"></input>
        <span>
          {errors.emial?.message}
        </span>
        <input {...register("firstName", { required: true })} placeholder="First Name"></input>
        <input {...register("lastName", { required: true })} placeholder="Last Name"></input>
        <input {...register("userName", { required: true, minLength: 10 })} placeholder="User Name"></input>
        
        <input {...register("passwordConfirm", { required: "Password is required...", minLength: { value: 5, message: "too short" } })} placeholder="Password Confirm"></input>
        <button>add</button>
      </form>
    </div>)
}

export default ToDoList;