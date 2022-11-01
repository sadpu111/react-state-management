import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form"; // 호출 대상을 중괄호로 안묶으면 호출 안됨(not callable)

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
  const { register, watch, handleSubmit, formState } = useForm(); // react-hook에서 제공하는 함수(watch:form의 입력값 추적, handleSubmit: onSubmit 대체)
  const onValid = (data: any) => {
    console.log(data);
  }
  console.log(formState.errors); // inValid 값 표시. 에러 처리
  // HTML의 required를 사용하면 외부인이 소스코드를 변경할 여지가 있기 때문에 자바스크립트를 활용하는 것이 안전({required:true}). 이를 사용하면 자동으로 invalid한 input으로 커서 이동. reqired: "메시지 입력" 또는 minLength에 조건과 메시지를 입력하여 invalid일 때 입력한 메시지 출력가능
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="Email"></input>
        <input {...register("firstName", { required: true })} placeholder="First Name"></input>
        <input {...register("lastName", { required: true })} placeholder="Last Name"></input>
        <input {...register("userName", { required: true, minLength: 10 })} placeholder="User Name"></input>
        <input {...register("password", { required: true, minLength: 10 })} placeholder="Password"></input>
        <input {...register("password Confirm", { required: "Password is required...", minLength: {value: 5, message: "too short"} })} placeholder="Password Confirm"></input>
        <button>add</button>
      </form>
    </div>)
}

export default ToDoList;