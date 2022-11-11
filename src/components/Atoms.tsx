import { atom, selector } from "recoil";
// atom은 배열을 줄 뿐이고(여기서), selector는 output인 배열을 변형한다(state 자체를 변형하는 것이 아님)

export interface IToDo { // (a) toDoState의 toDos(배열)이 어떤 형태를 갖는지 알려주는 interface를 정의하고
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; // type뿐만 아니라 내용까지 제한할 수 있다
}

export const toDoState = atom<IToDo[]>({ // (b) IToDO를 toDoState에 적용하여 해당 atom을 사용하는 배열의 형태를 typescript에 전달한다
  key: "todo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => { // 인자를 객체로 받는데, 그 객체에는 get함수가 들어가 있다
    const toDos = get(toDoState) // 위의 toDoState atom을 받아온다
    return [
      toDos.filter(toDo => toDo.category === "TO_DO"), // filter(조건) => 조건에 맞는 원소들로 구성된 '배열'을 return 한다
      toDos.filter(toDo => toDo.category === "DOING"),
      toDos.filter(toDo => toDo.category === "DONE")
    ]; // return값이 toDoSelector의 value가 된다
  },

})
