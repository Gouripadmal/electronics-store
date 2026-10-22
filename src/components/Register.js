import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await axios.post(
                "https://worksheet-product.mashupstack.com/register",
                {
                    user_name: userName,
                    email: email,
                    password: password
                }
            );

            alert("Registration successful!");
            navigate("/login");

        } catch (error) {
            alert("Registration failed!");
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Employee Registration</h2>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={(event) =>
                        setUserName(event.target.value)
                    }
                    required
                />

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

                <button type="submit">Register</button>
            </form>

            <p>
                Already registered? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;