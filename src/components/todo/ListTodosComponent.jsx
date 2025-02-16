import { useEffect, useState } from "react";
import { delUsersById, findUsers } from "./api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function ListTodosComponent() {
  /**
    const today = new Date();
    const targetDate = new Date(
      today.getFullYear() + 12,
      today.getMonth(),
      today.getDay()
    );
    */

  const authContext = useAuth();
  const message = authContext.message;
  const setmessage = authContext.setmessage;

  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

//   useEffect(() => {
//     refreshTodos();
//   }, []);

  // seEffect(() => {...}, [])	마운트될 때 한 번만 실행
  // useEffect(() => {...}, [값])	값이 변경될 때마다 실행
  // 최초 마운트 시(컴포넌트가 처음 화면에 나타날 때) 한 번만 API 호출
  // userId가 변경될 때만 API 다시 호출 → 불필요한 요청 방지
  // 메모리 누수 방지 - 컴포넌트가 언마운트될 때 불필요한 API 요청 중단 가능
  // fetchUser()가 렌더링될 때마다 실행되므로, 무한 API 요청이 발생할 수 있음.
  // 상태 업데이트(setUser())가 발생하면 다시 렌더링 → 다시 API 요청 → 무한 루프 발생 가능.

  useEffect(() => {
    console.log("message", message);
    if (message !== undefined) {
      alert(message);
      setmessage(undefined);
    }
    refreshTodos();
  }, [message]);

  async function refreshTodos() {
    findUsers()
      .then((response) => {
        console.log("response", response);
        setTodos(response.data);
      })
      .catch((error) => console.log("error", error));
  }

  async function deleteTodo(id) {
    try {
      const response = await delUsersById(id);
      if (response.status === 200) {
        setmessage("삭제되었습니다.");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function updateTodo(id) {
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    navigate(`/todo/-1`);
  }

  return (
    <div className="container">
      <h1>Todo details</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.user_name}</td>
                <td>{todo.done ? todo.done.toString() : false}</td>
                <td>{todo.birthDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-3" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
}
