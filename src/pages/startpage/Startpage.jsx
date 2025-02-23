import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Startpage.css'
import axios from 'axios';

const Startpage = () => {
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [registerEnabled, setRegisterEnabled] = useState(false);
  const navigate = useNavigate();

  //#region LOGIN
  const loginButton = () => {
    return (<button className='spform-button' type="button" onClick={() => setLoginEnabled(true)}>Login</button>)
  }

  const loginForm = () => {
    return (
      <form className='spform'>
        <label>Email:</label><br></br>
        <input className='spform-input' type='text' name='email' value={loginFields.email} onChange={(e) => handleLoginFieldChange(e)} placeholder='enter your email...'></input><br></br>
        <label>Password:</label><br></br>
        <input className='spform-input' type='password' name='password' value={loginFields.password} onChange={(e) => handleLoginFieldChange(e)} placeholder='enter your password...'></input><br></br>
        <button className='spform-button' onClick={(e) => login(e)}>Login</button>
      </form>
    )
  }

  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const handleLoginFieldChange = (e) => {
    setLoginFields((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  }

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`, 
        loginFields, 
        {
          withCredentials: true,
        });
      localStorage.setItem("user", response.data.username)
      console.log(response.data);
      navigate('/dashboard');
    } catch (err) {
      console.log("Catch: " + err);
    }
  }

  useEffect(() => {
  //  console.log(loginFields);
  }, [loginFields])

  //#endregion

  //#region REGISTER
  const registerLink = () => {
    return (<p className='sp-register-link'>Don't have an account? Register <a href="" onClick={(e) => showRegisterForm(e)}>here.</a></p>)
  }

  const showRegisterForm = (e) => {
    e.preventDefault();
    setRegisterEnabled(true)
  }

  const registerForm = () => {
    return (
      <form className='spform'>
        <label>Email:</label><br></br>
        <input className='spform-input' type='text' name='email' value={registerFields.email} onChange={(e) => handleRegisterFieldChange(e)} placeholder='enter your email...'></input><br></br>
        <label>Password:</label><br></br>
        <input className='spform-input' type='password' name='password' value={registerFields.password} onChange={(e) => handleRegisterFieldChange(e)} placeholder='enter your password...'></input><br></br>
        <button className='spform-button' onClick={(e) => register(e)}>Register</button>
      </form>
    )
  }

  const handleRegisterFieldChange = (e) => {
    setRegisterFields((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  }

  const [registerFields, setRegisterFields] = useState({
    email: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        registerFields,
        {
          withCredentials: true,
        });
      console.log(response.data);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.log("Catch: " + err);
    }
  }

  //#endregion

  //#region Page
	return (
		<div className="startpage">
      <div className='sp-logo'>
        <h1>ycFiles</h1>
        <p>your cloud files.</p>
      </div>
      {!loginEnabled && !registerEnabled 
      ? <>
        {loginButton()}
        {registerLink()}
      </>
       : null }
      {loginEnabled && !registerEnabled
      ? <>
      {loginForm()}
      {registerLink()}
      </>
      : null }
      {registerEnabled
      ? 
      registerForm()
      : null }
		</div>
	)
}
//#endregion

export default Startpage;
