import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div>
            <nav>
                <Link to="/register">Register</Link>{" | "}
                <Link to="/login">Login</Link>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductList />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;