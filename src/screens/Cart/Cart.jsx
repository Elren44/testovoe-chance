import React from 'react';
import {MainLayout} from "../../layout/Layout.jsx";
import Container from "@mui/material/Container";
import ProductsList from "../../components/ProductsList/ProductsList.jsx";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import styles from './Cart.module.scss'

function Cart(props) {
    const {cart} = useSelector((state) => state.app)
    return (
        <MainLayout>
            <section>
                <Container sx={{padding: "3rem 0"}}>
                    {cart.length === 0 ? (
                        <div className={styles.notfound}>
                            <div className={styles.notfound__title}>
                                Товары в корзине отсутствуют
                            </div>

                            <div className={styles.notfound__subtitle}>
                                Чтобы добавить товар перейдите в раздел с товарами
                            </div>
                            <NavLink className={styles.notfound__btn} to={'/'}>К товарам</NavLink>
                        </div>
                    ) : (
                        <ProductsList products={cart}/>
                    )}

                </Container>
            </section>
        </MainLayout>
    );
}

export default Cart;
