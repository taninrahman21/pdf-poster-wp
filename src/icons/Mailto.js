const MailtoIcon = ({ height = "24px", width = "24px", ...restProps }) => {
    return (
        <svg height={height} width={width} viewBox="0 0 176 176" xmlns="http://www.w3.org/2000/svg" {...restProps}><g id="Layer_2" data-name="Layer 2"><g id="mailto"><rect id="background" fill="#ea4335" height="176" rx="24" width="176" /><g id="icon" transform="translate(40 40) scale(0.1875)" fill="#fff"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></g></g></g></svg>
    );
};

export default MailtoIcon;
