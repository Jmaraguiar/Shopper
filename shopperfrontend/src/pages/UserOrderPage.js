import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShowItem } from "../components/ShowItem"
import { BASE_URL } from "../constants/BaseURL"
import { Navigation } from "../routes/cordinator"
import { Addres, Container, Footer, Form, Head, Header, Logo, Menu, Products, ProductSelection, Section } from "./styles/UserOrderStyle"

export const UserOrderPage = (props) => {
    const [products, setProducts] = useState()
    const [userName, setUserName] = useState()
    const [street, setStreet] = useState()
    const [district, setDistrict] = useState()
    const [number, setNumber] = useState()
    const [complement, setComplement] = useState()
    const [date, setDate] = useState()
    const [item, setItem] = useState()
    const [qty, setQty] = useState()
    const [price, setPrice] = useState(0)
    const [orderList, setOrderList] = useState([])

    const nav = useNavigate()

    const getProducts = () => {
        axios.get(`${BASE_URL}/getAllProducts`)
            .then(res => {
                setProducts(res.data.products)
            }).catch(err=>{
                alert(err.response.data)
            })
    }

    useEffect(() => {
        let localId = localStorage.getItem('orderId')
        if(localId !== null){
            Navigation(nav,`/Cart/${localId}`)
        }
        getProducts()
    }, [])

    const ProductList = products && products.map(item => {
        return (<option value={item.name}>{`${item.name} ----------> (${item.qty_stock} itens restantes em estoque)`}</option>)
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

    const onChangeUserName = (e) => {
        setUserName(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeDistrict = (e) => {
        setDistrict(e.target.value)
    }

    const onChangeNumber = (e) => {
        setNumber(e.target.value)
    }

    const onChangeComplement = (e) => {
        setComplement(e.target.value)
    }

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

    const sendOrder = () => {
        let orderId
        const order = {
            userName,
            order: orderList,
            price,
            date,
            address: `Bairro: ${district} | Rua: ${street} | Número: ${number} | Complemento: ${complement}`
        }

        axios.post(`${BASE_URL}/makeOrder`,order)
        .then(res=>{
            orderId = res.data.productID
            localStorage.setItem('orderId',orderId)
            Navigation(nav,`/Cart/${orderId}`)
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
                        <button onClick={() => Navigation(nav, '/')}>Voltar a Página Principal</button>
                    </Menu>
                </Head>
            </Header>
            <Section>
                <Form>
                    <h2>Formulário de encomenda </h2>
                    <input value={userName} onChange={onChangeUserName} type="text" placeholder="Nome do usuário" />
                    <h4 >Adicione seu endereço </h4>
                    <Addres>
                        <div>
                            <input value={district} onChange={onChangeDistrict} type="text" placeholder="Bairro" />
                            <input value={number} onChange={onChangeNumber} type="number" placeholder="Numero" />
                        </div>
                        <input value={street} onChange={onChangeStreet} type="text" placeholder="Rua" />
                        <input value={complement} onChange={onChangeComplement} type="text" placeholder="Complemento" />
                    </Addres>
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
                    <button onClick={sendOrder}>Enviar pedido</button>
                </Form>
            </Section>
            <Footer>
                <h3 id="contato">{`Entre e contato conosco: (XX) XXXXX-XXXX`}</h3>
            </Footer>
        </Container>
    )
}