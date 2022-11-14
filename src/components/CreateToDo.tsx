import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./Atoms";

interface IFormData {
  [key: string]: string;
}; // CreateToDo.tsx에서만 쓰이므로 여기로 가져온다

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IFormData>()
  // handleSubmit => 첫 번째 인자로 입력된 data가 유효할 때 호출할 함수 입력(여기선 handleValid). 두 번째 인자는 optional로 유효하지 않을 때 호출할 함수 입력
  const handleVaild = ({ toDo }: IFormData) => { // 아래 input의 register의 "toDo"로 입력되는 데이터를 받아오기 위해 {}를 열고 해당 name을 입력해야 한다
    setToDos(preToDos => [{ text: toDo, id: Date.now(), category: "TO_DO" }, // 아래 input에서 입력받은 데이터를 toDos 베열에 추가하는 과정
    ...preToDos]) // preToDos의 요소들이 들어있는 배열을 배열 안에 return. [preToDos]는 배열 자체를 받아오는 것, ..preToDos는 배열 안의 요소를 받아오는 것. 이를 다시 []안에 담는 것
    setValue("toDo", ""); // submit(add버튼 클릭 시)하고나면 해당 name의 input reset. 여러 개일 경우 reset() 활용
  }
  return (
    <form onSubmit={handleSubmit(handleVaild)}>
      <input {
        ...register("toDo", {
          required: "Please enter a todo"
        })}
        placeholder="Enter a todo">
      </input>
      <button>add</button>
    </form>
  )
}

export default CreateToDo;