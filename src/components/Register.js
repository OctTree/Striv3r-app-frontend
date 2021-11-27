
export default function Register() {
    return (
        <div className="col-12 bg-dark vh-100 justify-content-center">
            <div className="col-lg-4 col-md-4 col-12 p-4">

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

                <div class="input-group flex-nowrap mt-3">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" class="form-control" placeholder="Referral / Discount ID" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>


                <a className="strivbut btn btn-success mt-2">REGISTER</a>

            </div>
        </div>

    );
}