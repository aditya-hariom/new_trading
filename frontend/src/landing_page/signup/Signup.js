import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin 
                ? "http://localhost:3002/login" 
                : "http://localhost:3002/signup";
                
            const response = await axios.post(url, formData, { withCredentials: true });
            
            if (response.data.success) {
                toast.success(response.data.message, { position: "bottom-right" });
                // Save token to localStorage for local access
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                
                // Redirect to Dashboard (Port 3001) passing token via URL
                setTimeout(() => {
                    window.location.href = `http://localhost:3001/?token=${response.data.token}`;
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", { position: "bottom-right" });
        }
    };

    return ( 
        <div className='container mt-2'>
            <ToastContainer />
            <div className='row text-center mb-2 p-5'>
                <h2 className='fs-2 mb-3 mt-5 text-dark'>Open a free demat and trading account online</h2>
                <p className='text-muted fs-5'>Start investing brokerage free and join a community of 1.6+ crore investors and traders</p>
            </div>
            
            <div className='row align-items-center mt-3 p-5'>
                <div className='col-md-7 text-center'>
                    <img src='images/signup.png' alt='Signup' className='img-fluid' style={{ maxWidth: '90%' }} />
                </div>
                <div className='col-md-5 p-4 border rounded shadow-sm'>
                    <h2 className='mb-3 text-dark'>{isLogin ? 'Login to your account' : 'Signup now'}</h2>
                    <p className='text-muted mb-4'>Enter your details below</p>
                    
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={formData.username}
                                    onChange={handleOnChange}
                                    className="form-control p-2" 
                                    placeholder="Enter your username" 
                                    required
                                />
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleOnChange}
                                className="form-control p-2" 
                                placeholder="Enter your email" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleOnChange}
                                className="form-control p-2" 
                                placeholder="Enter your password" 
                                required
                            />
                        </div>
                        <button type="submit" className='btn btn-primary w-100 fw-bold p-2 mb-3'>
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                    </form>

                    <p className='text-muted text-center mb-3' style={{fontSize: "0.95rem"}}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span 
                            style={{textDecoration: "underline", color: "blue", cursor: "pointer"}}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Signup here" : "Login here"}
                        </span>
                    </p>

                    <p className='text-muted mt-4 text-center' style={{fontSize: "0.85rem"}}>
                        By proceeding, you agree to the Zerodha <a href="#" style={{textDecoration: "none"}}>terms</a> & <a href="#" style={{textDecoration: "none"}}>privacy policy</a>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default Signup;