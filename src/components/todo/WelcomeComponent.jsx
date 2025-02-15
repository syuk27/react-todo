import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findUsers, findUsersById } from "./api/api";

export default function WelcomeComponent() {
  const { username } = useParams();

  const [message, setMessage] = useState(null);

  console.log("username", username);

  function callHelloWorldRestApi() {
    //axios => npm install axios

    findUsers()
      .then((response) => {
        successfulResponse(response);
      })
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  async function successfulResponse(response) {
    const dataObj = response.data
      .map((data) => data)
      .filter((data, idx) => idx === 0)[0];

    setMessage(dataObj.user_name);

    try {
      //await와, .then()을 같이 사용하여 불필요한 비동기 체이닝이 발생.
      const user = await findUsersById(dataObj.id);
      console.log("user", user);
    } catch (error) {
      errorResponse(error);
    }

    console.log(response);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos. <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success" onClick={callHelloWorldRestApi}>
          Call Hello World
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}
