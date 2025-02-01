import './Startpage.css'

const Startpage = () => {

	return (
		<div className="startpage">
      <div className='sp-logo'>
        <h1>ycFiles</h1>
        <p>Your Cloud Files.</p>
      </div>
      <button className='sp-loginbutton' type="button">Login</button>
      <p>Don't have an account? Register <a href="">here.</a></p>
		</div>
	)
}

export default Startpage;
