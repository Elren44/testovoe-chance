import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import styles from './ProductItem.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addToCart, addToFavorites, removeFromCart, removeFromFavorites} from "../../store/slices/app.js";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
function ProductItem(props) {
    const pathname = useLocation().pathname
    const [count, setCount ] = useState(0)
    const [inFavorites, setInFavorites] = useState({})
    const [inCart, setInCart ] = useState({})
    const dispatch = useDispatch();
    const {cart, favorites} = useSelector(state => state.app)

    useEffect(() => {

        let founded = false;
        cart.map(el=> {
            if (el.name === props.product.name) {
                founded = true
                setCount(el.count)
                setInCart(el)
            }
        })
        if (!founded) {
            setCount(0)
            setInCart(null)
        }

        favorites.map(el => {
            if (el.name === props.product.name) {
                setInFavorites(el)
            }
        })
    }, [cart, favorites, props.product]);
    return (
        <Card className={styles.item}>
            <CardActionArea className={styles.item__body}>
                <CardMedia
                    className={styles.item__img}
                    component="img"
                    style={{objectFit: "contain"}}
                    height="240"
                    image={props.product.picture}
                    alt={props.product.name}
                />
                <CardContent className={styles.item__content}>
                    <Typography className={styles.item__title} gutterBottom variant="h6" >
                        {props.product.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Цена: {props.product.price}р.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions >
                <Button disabled={inFavorites.name && pathname !== '/favorites'} sx={{alignItems: "center", lineHeight: "30px"}} size="small" color="primary" onClick={() => {
                   if (pathname === '/favorites') {
                       dispatch(removeFromFavorites(props.product))
                   } else {
                           dispatch(addToFavorites(props.product))
                   }


                }}>
                    <span style={{alignSelf: "center"}}>{
                        inFavorites.name ? pathname === '/favorites' ? "Удалить из избранного": "В Избранном" : "В избранное"
                    }</span>
                </Button>
                {count > 0 ? (
                    <div className={styles.counter}>
                        <div onClick={() => {
                            dispatch(removeFromCart(props.product))
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                            </svg>

                        </div>
                        <span>{count}</span>
                        <div className={inCart?.count === props.product.quantity ? styles.disabled : ""} onClick={() => {
                            dispatch(addToCart(props.product))
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>

                        </div>
                    </div>
                ) : (
                    <Button size="small" color="primary" onClick={() => {
                        dispatch(addToCart(props.product))
                    }}>
                        {props.product.quantity === 0 ? "Отсутствует" : "В Корзину"}
                    </Button>
                )}

            </CardActions>
        </Card>
    );
}

export default ProductItem;
