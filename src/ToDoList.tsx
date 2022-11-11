import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form"; // 호출 대상을 중괄호로 안묶으면 호출 안됨(not callable)
/* 
interface IFormData {
  [key: string]: string;
} // index signature 선언 */

/* interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
  extraError?: string;
}; */

interface IFormData {
  [key: string]: string;
};

function ToDoList() {
  const { register, handleSubmit, setValue, reset } = useForm<IFormData>()
  // handleSubmit => 첫 번째 인자로 입력된 data가 유효할 때 호출할 함수 입력(여기선 handleValid). 두 번째 인자는 optional로 유효하지 않을 때 호출할 함수 입력
  const handleVaild = (data: IFormData) => {
    console.log("add todo", data);
    setValue("todo1", ""); // submit(add버튼 클릭 시)하고나면 해당 name의 input reset. 여러 개일 경우 reset() 활용
    // reset();
  }
  return <div>
    <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(handleVaild)}>
      <input {
        ...register("todo1", {
          required: "Please enter a todo"
        })}
        placeholder="Enter a todo">
      </input>
      <input {
        ...register("todo2", {
          required: "Please enter a todo"
        })}
        placeholder="Enter a todo">
      </input>
      <button>add</button>
    </form>
  </div>
}

/* function ToDoList() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<IFormData>(); // react-hook에서 제공하는 함수(watch:form의 입력값 추적, handleSubmit: onSubmit 대체)
  const onValid = (data: IFormData) => {
    if (data.password !== data.passwordConfirm) {
      return setError("passwordConfirm", { message: "password is not the same..." }, { shouldFocus: true })
    };
    // setError("extraError", {message: "server offline..."})
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      ><input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>
          {errors.email?.message}
        </span>
        <input
          {...register("firstName", {
            required: "First name  is required",
            validate: {
              noWoo: (value) => value.includes("woo") ? "No woos allows" : true,
              noFWord: (value) => value.includes("fuck") ? "No F words allows" : true,
            }
          })} placeholder="First Name"></input>
        <span>
          {errors.firstName?.message}
        </span>
        <input {...register("lastName", { required: "Last name is required" })} placeholder="Last Name"></input>
        <span>
          {errors.lastName?.message}
        </span>
        <input {...register("userName", { required: "User name is required", minLength: { value: 5, message: "too short" } })} placeholder="User Name"></input>
        <span>
          {errors.userName?.message}
        </span>
        <input {...register("password", { required: "Password is required", minLength: { value: 5, message: "too short" } })} placeholder="Password"></input>
        <span>
          {errors.password?.message}
        </span>
        <input {...register("passwordConfirm", { required: "Password confirm is required...", minLength: { value: 5, message: "too short" } })} placeholder="Password Confirm"></input>
        <span>
          {errors.passwordConfirm?.message}
        </span>
        <button>add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>)
} */

export default ToDoList;