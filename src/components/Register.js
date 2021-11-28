

const signup_state = {
    name: '',
    email: '',
    phone: '',
    password: '',
    zip: '',
    signup_name_error: false,
    signup_phone_error: false,
    signup_email_error: false,
    signup_password_error: false,
    signup_zip_error: false,
}


export default function Register() {

    const [signUpObject, setSignUpObject] = useState(signup_state);
    const [IsLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSignupSubmit = (event) => {
        event.preventDefault();


        const signup_parameter = {
            user: {
                name: signUpObject.firstname,
                email: signUpObject.email,
                password: signUpObject.password,
                role_id:"2",
                zip: signUpObject.zip,
                phone: signUpObject.lastname,
                
            }
        }
        console.log(signup_parameter)

        if (signUpObject.name === '') {
            setSignUpObject({ ...signUpObject, signup_name_error: true })
        }
        else if (signUpObject.phone === '') {
            setSignUpObject({ ...signUpObject, signup_phone_error: true })
        }
        else if (signUpObject.email === '') {
            setSignUpObject({ ...signUpObject, signup_email_error: true })
        }
        else if (signUpObject.password === '') {
            setSignUpObject({ ...signUpObject, signup_password_error: true })
        }
        else {
            setIsLoading(true)
            axios.post('/users', signup_parameter, { headers: { 'Content-Type': 'application/json', Accept: "*/*" } })
                .then(response => {
                    setIsLoading(false)
                    let state_value = response.status
                    if (state_value === 200) {
                        toast.success("Success! Login to Continue.", { position: toast.POSITION.TOP_CENTER })
                        history.push('/auth');
                    }
                    localStorage.setItem("access-token", response.data);
                }).catch(error => {
                    setIsLoading(false)
                    console.log(error.response)
                    if (!error.response) {
                        history.push('/auth/register/new');
                    }
                    else {
                        let state_value = error.response.status
                        if (state_value === 500 || 400 || 401) {
                            history.push('/auth/register/new');
                            toast.error("Invalid Email or Email Id Already Registered", { position: toast.POSITION.TOP_CENTER })
                        }

                    }
                }
                )
        }

    }

    return (
        <div className="col-12 bg-dark vh-100 justify-content-center">
            <div className="col-lg-4 col-md-4 col-12 p-4">

                <form onSubmit={handleSignupSubmit}>

                <label for="basic-url" class="form-label text-white">REGISTER</label>

                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>

                <div class="input-group flex-nowrap mt-3">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>

                <div class="input-group flex-nowrap mt-3">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="Phone(Optional)" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>

                <div class="input-group flex-nowrap mt-3">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>

                <div class="input-group flex-nowrap mt-3">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="Confirm Password" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>

                <div class="input-group flex-nowrap mt-3">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="ZIP" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>


                    <button className="strivbut btn btn-success mt-2">{IsLoading ? "Please Wait...." : "REGISTER"}</button>
                </form>
            </div>
        </div>

    );
}