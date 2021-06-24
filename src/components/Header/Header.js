import './Header.css';

function Header(props) {
    
    return (
        <div className={props.header === true ? 'header' : 'header header_movie'}>
            <div className="logo"></div>
            {props.children}
        </div>
    )
}

export default Header;
