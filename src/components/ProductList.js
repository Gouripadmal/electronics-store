import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../authSlice";
import { useNavigate } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = useSelector(
        (state) => state.auth.token
    );

    const email = useSelector(
        (state) => state.auth.email
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "https://worksheet-product.mashupstack.com/product",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = response.data;

                setProducts(
                    Array.isArray(data)
                        ? data
                        : data.products || []
                );

            } catch (error) {
                console.log(error);
                alert("Unable to fetch products!");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProducts();
        }
    }, [token]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (loading) {
        return <h3>Loading products...</h3>;
    }

    return (
        <div>
            <h2>Electronics Store Dashboard</h2>

            <p>Logged in as: {email}</p>

            <button onClick={handleLogout}>Logout</button>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>₹{product.price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {products.length === 0 && (
                <p>No products available.</p>
            )}
        </div>
    );
}

export default ProductList;