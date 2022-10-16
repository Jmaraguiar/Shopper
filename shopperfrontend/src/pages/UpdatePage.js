import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ShowItem } from "../components/ShowItem"
import { BASE_URL } from "../constants/BaseURL"
import { Navigation } from "../routes/cordinator"
import { Addres, Container, Footer, Form, Head, Header, Logo, Menu, Products, ProductSelection, Section } from "./styles/UpdatePageStyle"

export const UpdatePage = (props) => {
    const [products, setProducts] = useState()
    const [currOrder, setCurrOrder] = useState()
    const [date, setDate] = useState()
    const [item, setItem] = useState()
    const [qty, setQty] = useState()
    const [price, setPrice] = useState(0)
    const [orderList, setOrderList] = useState([])
    const params = useParams()
    const nav = useNavigate()

    const getProducts = () => {
        axios.get(`${BASE_URL}/getAllProducts`)
            .then(res => {
               setProducts(res.data.products)
            }).catch(err=>{
                alert(err.response.data)
            })
    }

    const setOrder = () => {
        axios.get(`${BASE_URL}/getAllOrders`)
            .then(res => {
                const orders = res.data.orders
               for(let item of orders){
                if(item.id === params.id){
                    setCurrOrder(item)
                }
               }
            }).catch(err=>{
                alert(err.response.data)
            })
    }

    useEffect(() => {
        getProducts()
        setOrder()
    }, [])

    useEffect(() => {
        if(currOrder){
            setDate(currOrder.date)
            setOrderList(currOrder.order)
            setPrice(currOrder.price)
        }
    }, [currOrder])

    const ProductList = products && products.map(item => {
        return (<option value={item.name}>{item.name} | {item.qty_stock}</option>)
    })

    const delItemInOrder = (name,qty,i) => {
        decreasePrice(name,qty)
        orderList.splice(i,1)
        setOrderList(orderList)
    }

    const list = orderList && orderList.map((item,i)=>{
        return(<ShowItem 
            key={item.name}
            qty={item.qty}
            name={item.name}
            index={i}
            delItem={delItemInOrder}
        />)
    })


    const onChangeDate = (e) => {
        setDate(e.target.value)
    }

    const onChangeItem = (e) => {
        setItem(e.target.value)
    }

    const onChangeQty = (e) => {
        setQty(e.target.value)
    }

    const increasePrice = (currItemName,qty) => {
        let currItem 

        for(let item of products){
            if(item.name === currItemName){
                currItem = item
            }
        }

        const newPrice = price + (currItem.price * qty)
        setPrice(newPrice)
    }

    const decreasePrice = (currItemName,qty) => {
        let currItem 

        for(let item of products){
            if(item.name === currItemName){
                currItem = item
            }
        }

        const newPrice = price - (currItem.price * qty)
        setPrice(newPrice)
    }

    const addItemInOrder = () => {
        increasePrice(item,qty)
        const order = {name: item,qty: qty}
        const newArray = [...orderList,order]
        setOrderList(newArray)
    }

    const sendOrderUpdate = () => {
        const order = {
            id: params.id,
            order: orderList,
            price,
            date,
        }

        axios.put(`${BASE_URL}/UpdateOrder`,order)
        .then(res=>{
            alert(res.data)
            Navigation(nav,`/Cart/${params.id}`)
        }).catch(err=>{
            alert(err.response.data)
        })

    }

    


    return (
        <Container>
            <Header>
                <Head>
                    <Logo>
                        <h1>WebMarket</h1>
                    </Logo>
                    <Menu>
                        <button onClick={() => Navigation(nav, `/Cart/${params.id}`)}>Voltar a Página Principal</button>
                    </Menu>
                </Head>
            </Header>
            <Section>
                <Form>
                    <h2>Formulário de Edição</h2>
                    <h4 >Data de entrega </h4>
                    <input value={date} onChange={onChangeDate} type="date" />
                    <h4 >Selecione os produtos  </h4>
                    <ProductSelection>
                        <div>
                            <select onChange={onChangeItem}>
                                <option>Selecione um produto</option>
                                {ProductList}
                            </select>
                            <input value={qty} onChange={onChangeQty} id="qty" type="number" placeholder="Quantindade" />
                        </div>
                        <button onClick={addItemInOrder}>Adicionar item</button>
                    </ProductSelection>
                    <Products>
                        {list}
                        <h3>Total: {price} R$</h3>
                    </Products>
                    <button onClick={sendOrderUpdate}>Editar pedido</button>
                </Form>
            </Section>
            <Footer>
                <h3 id="contato">{`Entre e contato conosco: (XX) XXXXX-XXXX`}</h3>
            </Footer>
        </Container>
    )
}