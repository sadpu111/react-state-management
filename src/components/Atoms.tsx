import { atom } from "recoil";

export interface IToDo { // (a) toDoState의 toDos(배열)이 어떤 형태를 갖는지 알려주는 interface를 정의하고
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // type뿐만 아니라 내용까지 제한할 수 있다
}

export const toDoState = atom<IToDo[]>({ // (b) IToDO를 toDoState에 적용하여 해당 atom을 사용하는 배열의 형태를 typescript에 전달한다
  key: "todo",
  default: [],
});

