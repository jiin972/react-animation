import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
  isDone: boolean;
  completedAt?: number;
}

interface IToDoState {
  [key: string]: ITodo[]; //key는 문자열, 해당 값은 문자열 배열
}

const { persistAtom } = recoilPersist();

export const toDosState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [], //boardId
    Doing: [], //boardId
    Done: [], //boardId
  },
  effects_UNSTABLE: [persistAtom],
});
