import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { modifyUsersById, saveUser } from "./api/api";
import { useAuth } from "./security/AuthContext";

export default function TodoComponent() {
  const { id } = useParams();

  const setmessage = useAuth().setmessage;
  const navigate = useNavigate();

  function modifyUser(event) {
    let data;
    if (!event.type) {
      event.preventDefault();
      const formData = new FormData(event.target);
      data = Object.fromEntries(formData.entries());
    }

    if(event.type==="formik") data = event;

    const user = {
      userName: data.userName,
      birthDate: data.birthDate,
    };

    if(id != -1) {
        user.id = id;
        modifyUsersById(id, user)
          .then((response) => {
            console.log("response", response);
            setmessage("수정되었습니다.");
            navigate("/todos");
          })
          .catch((error) => console.log("error", error));
    } else {
        saveUser(user)
          .then((response) => {
            console.log("response", response);
            setmessage("저장되었습니다.");
            navigate("/todos");
          })
          .catch((error) => console.log("error", error));
    }
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      {/* <UserBasicForm modifyUser={modifyUser} /> */}
      <UseFormik modifyUser={modifyUser} />
    </div>
  );
}

function UserBasicForm({ modifyUser }) {
  return (
    <form onSubmit={modifyUser}>
      <div>
        이름: <input type="text" name="userName"></input>
      </div>
      <div>
        생년월일: <input type="date" name="birthDate"></input>
      </div>
      <button type="submit" style={{ marginLeft: "2px" }}>
        Save
      </button>
    </form>
  );
}

function validate(values) {
    let errors = {};

    console.log("values", values)

    if(values.userName.length < 5) {
        errors.userName = "이름 유효성 검사 테스트2";
    }

    return errors;
}

function UseFormik({ modifyUser }) {
  return (
    <Formik
      initialValues={{ userName: "", birthDate: "", type: "formik" }}
      onSubmit={modifyUser}
      validate={validate}
    >
      {(props) => (
        <Form>
          <ErrorMessage 
            name="userName"
            component="div"
            className="alert alert-warning"
          />  

          <fieldset className="form-group">
            <label>이름 :</label>
            <Field type="text" name="userName" className="form-control" />
          </fieldset>

          <fieldset className="form-group">
            <label>생년월일 :</label>
            <Field type="date" name="birthDate" className="form-control" />
          </fieldset>

          <button type="submit" className="m-5" style={{ marginLeft: "2px" }}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
}
