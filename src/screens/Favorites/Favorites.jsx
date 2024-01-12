import {MainLayout} from "../../layout/Layout.jsx";
import Container from "@mui/material/Container";
import {useSelector} from "react-redux";
import ProductsList from "../../components/ProductsList/ProductsList.jsx";
import React from "react";
import styles from "../Cart/Cart.module.scss";
import {NavLink} from "react-router-dom";

export const Favorites =() => {
    const {favorites} = useSelector((state) => state.app)
    return (
        <MainLayout>
            <section>
                <Container sx={{padding: "3rem 0"}}>
                    {favorites.length === 0 ? (
                        <div className={styles.notfound}>
                            <div className={styles.notfound__title}>
                                Товары в избранном отсутствуют
                            </div>

                            <div className={styles.notfound__subtitle}>
                                Чтобы добавить товар перейдите в раздел с товарами
                            </div>
                            <NavLink className={styles.notfound__btn} to={'/'}>К товарам</NavLink>
                        </div>
                    ) : (
                        <ProductsList products={favorites}/>
                    )}
                </Container>
            </section>
        </MainLayout>
    );
}
