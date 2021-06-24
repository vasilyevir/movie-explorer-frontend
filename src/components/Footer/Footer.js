import './Footer.css';

function Footer() {
    
    return (
        <div className="footer">
            <h2 className="footer__header"> Учебный проект Яндекс.Практикум х BeatFilm. </h2>
            <div className="footer__container">
                <p className="footer__links">© 2020</p>
                <div className="footer__container-links">
                    <p className="footer__links">Яндекс.Практикум</p>
                    <p className="footer__links">Github</p>
                    <p className="footer__links">Vkontakte</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
