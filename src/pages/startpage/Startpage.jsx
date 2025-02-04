import { useState } from 'react';
import './Startpage.css'
import axios from 'axios';

const Startpage = () => {
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [registerEnabled, setRegisterEnabled] = useState(false);

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
        <input className='spform-input' type='text' name='password' value={loginFields.password} onChange={(e) => handleLoginFieldChange(e)} placeholder='enter your password...'></input><br></br>
        <button className='spform-button' onClick={() => login()}>Login</button>
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

  const login = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`, 
        loginFields, 
        {
          withCredentials: true,
        });
      console.log(response.data);
    } catch (err) {
      console.log("Catch: " + err);
    }
  }

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
        <input className='spform-input' type='text' name='password' value={registerFields.password} onChange={(e) => handleRegisterFieldChange(e)} placeholder='enter your password...'></input><br></br>
        <button className='spform-button'>Register</button>
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

  const register = () => {

  }

  //#endregion

	return (
		<div className="startpage">
      <div className='sp-logo'>
        <h1>ycFiles</h1>
        <p>Your Cloud Files.</p>
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

export default Startpage;
