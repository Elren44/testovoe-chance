import {useEffect, useState} from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Products.module.scss'
import {Router} from "react-router-dom";
import {MainLayout} from "../../layout/Layout.jsx";
import Container from "@mui/material/Container";
import ProductsList from "../../components/ProductsList/ProductsList.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/slices/app.js";

function Products() {
    const {products} = useSelector((state) => state.app)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, []);
    return (
        <MainLayout>
            <section>
                <Container sx={{padding: "3rem 0"}}>
                    <ProductsList products={products.items}/>
                </Container>
            </section>
        </MainLayout>
    )
}

export default Products
