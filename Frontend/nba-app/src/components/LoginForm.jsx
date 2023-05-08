

export const LoginForm = ({Login}) => {


    return(
        <>
            <label >Email</label><br/>
            <input type="text" className="emailInput" value="test@gmail.com"/><br/>
            <label >Password</label><br/>
            <input type="text" clasSName="pwInput" value="password"/><br/><br/>
            <button onClick={() => Login()}>Login</button>
        </>
    )

}