import React, {useEffect, useState} from 'react';
import {Card, Grid, Paper} from "@mui/material";
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from "@mui/material/Box";
import ProductItem from "../ProductItem/ProductItem.jsx";
import axios from "axios";
import styles from "./ProductList.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/slices/app.js";
import {LOADING} from "../../services/constants.js";
import Typography from "@mui/material/Typography";

function ProductsList({products}) {


    const { loadingStatus} = useSelector((state) => state.app)


    return (
        <Box sx={{flexGrow: 1,}}>
            {
                loadingStatus === LOADING
                    ? <Box className={styles.loader}><Typography textAlign={'center'} justifySelf={'center'}
                                                                 sx={{fontSize: "46px"}}
                                                                 color="text.secondary">Загрузка</Typography></Box> : (
                        <div className={styles.list}>
                            {products?.length > 0 && products.map((product, index) => (
                                <ProductItem product={product} key={product.name}/>
                            ))
                            }
                        </div>)

            }

        </Box>
    );
}

export default ProductsList;
