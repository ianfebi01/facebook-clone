import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className='login_footer'>
      <div className='login_footer_wrap'>
        <Link to='/'>Bahasa Indonesia</Link>
        <Link to='/'>English (UK)</Link>
        <Link to='/'>Basa Jawa</Link>
        <Link to='/'>Bahasa Melayu</Link>
        <Link to='/'>日本語</Link>
        <Link to='/'>العربية</Link>
        <Link to='/'>Français (France)</Link>
        <Link to='/'>Español</Link>
        <Link to='/'>한국어</Link>
        <Link to='/'>Português (Brasil)</Link>
        <Link to='/'>Deutsch</Link>
        <Link to='/' className='footer_square'>
          <i className='plus_icon'></i>
        </Link>
      </div>
      <div className='footer_splitter'></div>
      <div className='login_footer_wrap'>
        <Link to='/'>Sign Up</Link>
        <Link to='/'>Log In</Link>
        <Link to='/'>Messenger</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
        <Link to='/'>Facebook Lite</Link>
      </div>
      <div className='login_footer_wrap'>
        <Link to='/' style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2022
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
