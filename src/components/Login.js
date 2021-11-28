import './Design.css'

const login_state = {
    email: '',
    password: '',
    login_email_error: false,
    login_password_error: false
}

export default function Login() {

    const [IsLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [loginObject, setloginObject] = useState(login_state)

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const login_parameter = {
            email: loginObject.email,
            password: loginObject.password,
        }

        if (loginObject.email === '' && loginObject.password === '') {
            setloginObject({ ...loginObject, login_email_error: true, login_password_error: true })
        } else if (loginObject.email === '') {
            setloginObject({ ...loginObject, login_email_error: true })
        } else if (loginObject.password === '') {
            setloginObject({ ...loginObject, login_password_error: true })
        } else {
            setIsLoading(true)
            axios.post('/login', login_parameter, { headers: { 'Content-Type': 'application/json', Accept: "*/*" } })
                .then(response => {
                    setIsLoading(false)
                    let state_value = response.status
                    if (state_value === 200) {
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('id', response.data.data.user.user.id)
                        localStorage.setItem("first_name", response.data.data.user.user.first_name)
                        localStorage.setItem("last_name", response.data.data.user.user.last_name)
                        toast.success("Login Success. Welcome!", { position: toast.POSITION.TOP_CENTER })
                        history.push('/admin');
                    }
                    localStorage.setItem("access-token", response.data);
                }).catch(error => {
                    console.log(error.response)
                    setIsLoading(false)
                    let state_value = error.response.status
                    if (state_value === 401) {
                        if (error.response.data.errors[0] === "Please confirm your account") {
                            toast.error("Please confirm your account", { position: toast.POSITION.TOP_CENTER })
                        } else {
                            toast.error("Invalid email or password", { position: toast.POSITION.TOP_CENTER })
                        }
                    }
                });
        }

    }


    return (
        <div className="col-12 bg-dark vh-100 justify-content-center">
            <div className="col-lg-4 col-md-4 col-12 p-4">

                <form onSubmit={handleLoginSubmit}>

                    <label for="basic-url" class="form-label text-white">LOGIN</label>

                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">@</span>
                        <input type="text" class="form-control" placeholder="Email" aria-label="Username"

                            onChange={event => setloginObject({
                                ...loginObject, email: event.target.value,
                                login_email_error: false
                            })}

                            aria-describedby="addon-wrapping" />
                    </div>
                    <label for="basic-url" class="form-label text-white">{login_password_error ? "email is required" : ""}</label>

                    <div class="input-group flex-nowrap mt-3">
                        <span class="input-group-text" id="addon-wrapping">@</span>
                        <input type="text" class="form-control" placeholder="Password" aria-label="Username"

                            onChange={event => setloginObject({
                                ...loginObject, password: event.target.value,
                                login_password_error: false
                            })}

                            aria-describedby="addon-wrapping" />
                    </div>
                    <label for="basic-url" class="form-label text-white">{login_password_error ? "Password is required" : ""}</label>

                    <div><a href="/#" className="text-decoration-none text-white">Forgot Password?</a></div>

                    <button type="submit" className="strivbut btn btn-success mt-2">{IsLoading ? "Please Wait...." : "LOGIN"}</button>
                </form>
            </div>
        </div>
    );
}