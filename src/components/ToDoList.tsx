import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form"; // 호출 대상을 중괄호로 안묶으면 호출 안됨(not callable)
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IToDo { // (a) toDoState의 toDos(배열)이 어떤 형태를 갖는지 알려주는 interface를 정의하고
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // type뿐만 아니라 내용까지 제한할 수 있다
}

const toDoState = atom<IToDo[]>({ // (b) IToDO를 toDoState에 적용하여 해당 atom을 사용하는 배열의 형태를 typescript에 전달한다
  key: "todo",
  default: [],
});

interface IFormData {
  [key: string]: string;
};

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState); // 아래 두 줄의 코드를 한 줄로 합친 것(value: toDos, modFunc: setToDos). useState와 유사한 구조
/*   const value = useRecoilValue(toDoState); // (1) atom의 배열을 가져오고
  const modFunc = useSetRecoilState(toDoState); // (2) 그 배열을 수정한다 */
  const { register, handleSubmit, setValue, reset } = useForm<IFormData>()
  // handleSubmit => 첫 번째 인자로 입력된 data가 유효할 때 호출할 함수 입력(여기선 handleValid). 두 번째 인자는 optional로 유효하지 않을 때 호출할 함수 입력
  const handleVaild = ({toDo}: IFormData) => { // 아래 input의 register의 "toDo"로 입력되는 데이터를 받아오기 위해 {}를 열고 해당 name을 입력해야 한다
    setToDos(preToDos => [{text: toDo, id: Date.now(), category: "TO_DO"}, // 아래 input에서 입력받은 데이터를 toDos 베열에 추가하는 과정
    ...preToDos]) // preToDos의 요소들이 들어있는 배열을 배열 안에 return. [preToDos]는 배열 자체를 받아오는 것, ..preToDos는 배열 안의 요소를 받아오는 것. 이를 다시 []안에 담는 것
    setValue("toDo", ""); // submit(add버튼 클릭 시)하고나면 해당 name의 input reset. 여러 개일 경우 reset() 활용
    // reset();
    console.log(toDos)
  }
  return <div>
    <h1>To Dos</h1>
    <hr />
    <form style={
      { display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(handleVaild)}>
      <input {
        ...register("toDo", {
          required: "Please enter a todo"
        })}
        placeholder="Enter a todo">
      </input>
      <button>add</button>
    </form>
    <ul>
      {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
    </ul>
  </div>
}

export default ToDoList;