import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../authSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "https://worksheet-product.mashupstack.com/login",
                {
                    email: email,
                    password: password
                }
            );

            const data = response.data;
            const token = data.token || data.access_token;

            if (!token) {
                alert("Token not found in login response!");
                console.log(data);
                return;
            }

            dispatch(
                loginSuccess({
                    email: email,
                    token: token
                })
            );

            alert("Login successful!");
            navigate("/products");

        } catch (error) {
            alert("Login failed!");
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Employee Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p>
                New employee? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;