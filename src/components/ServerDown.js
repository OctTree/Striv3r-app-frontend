

export default function ServerDown() {
    return(<div className="mt-5">
        <h1 className="text-white text-center">500</h1>
        <h3 className="text-center text-white mt-3">Internal server error</h3>
        <h5 className="text-center text-white mt-3">Something went wrong, we are fixing this, we will get back to you soon.</h5>
        <p className="text-center mt-3"><a className="btn btn-primary" href="/">Home</a></p>
    </div>)
}