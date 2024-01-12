import axios from "axios";

export const getProducts = () => {
    try {
        axios.get('/products').then((res) => {
            if (res?.status == 200 && res?.data?.success) {
                return res
            }
        }).catch(e=> {
            //TODO реализовать
            console.log(e)
            return e;
        })
    } catch (e) {
        //TODO реализовать
        console.log(e)
        return e;

    }
}
