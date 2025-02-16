import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode> 첫 렌더링 두번 되는 오류있음
    <App />
  // </StrictMode>,
)


//axios => npm install axios
//날짜 및 시간 관리 라이브러리 => npm install moment
//Formik – React에서 폼(Form) 관리를 쉽게 하는 라이브러리 => npm install formik

