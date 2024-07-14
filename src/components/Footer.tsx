const Footer = (): JSX.Element => {
    return <footer className="footer">
        <span className="footer__text">
            © 2024, from
            <a className="footer__link" href="https://binary-studio.com">
                binary studio
            </a>
            with
            <img className="footer__icon" src="/assets/images/heart.svg" alt="heart" />
        </span>
    </footer>

}

export { Footer }