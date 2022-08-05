import './Header.css';

function Header({display}) {
    return (display &&
        <header className="Header">
            <h1>Welcome to <span style={{fontFamily: "'Oleo Script Swash Caps', cursive"}}>Quiz Your Knowledge</span></h1>
        </header>
    );
}

export default Header;