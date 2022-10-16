import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BASE_URL } from "../constants/BaseURL"
import { Navigation } from "../routes/cordinator"
import { Container, Footer, Head, Header, Info, Logo, Menu, Section } from "./styles/UserCartStyle"
import { ShowOrder } from "../components/ShowOrder"

export const UserCartPage = (props) => {
    const [orders, setOrders] = useState([])
    const [currOrder, setCurrOrder] = useState()
    const nav = useNavigate()
    const params = useParams()

    const getOrders = () => {
        axios.get(`${BASE_URL}/getAllOrders`)
            .then(res => {
                setOrders(res.data.orders)
            }).catch(err => {
                alert(err.response.data)
            })
    }

    const getOrderById = () => {
        for (let item of orders) {
            if (item.id == params.id) {
                setCurrOrder(item)
            }
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        getOrderById()
    }, [orders])


    const reset = () => {
        if(window.confirm("Ao concluir a entrega, você confirma que o pedido foi entregue, deseja continuar?")){
            axios.put(`${BASE_URL}/orderCompleteUpdate/${params.id}`)
        .then(res=>{
            localStorage.removeItem('orderId')
            Navigation(nav, '/')
        }).catch(err=>{
            alert(err.response.data)
        })
        }
    }

    const delOrder = () => {
        if(window.confirm("O pedido será deletado permanente mente, deseja continuar?")){
            axios.delete(`${BASE_URL}/delOrder/${params.id}`)
        .then(res=>{
            localStorage.removeItem('orderId')
            Navigation(nav, '/')
        }).catch(err=>{
            alert(err.response.data)
        })
        }
    }

    const OrderList = currOrder && currOrder.order.map(item=>{
        return(<ShowOrder
            key={item.name}
            name={item.name}
            qty={item.qty}
        />)
    })

    const dateYear = currOrder && currOrder.date.slice(0,4)
    const dateMonth = currOrder && currOrder.date.slice(5,7)
    const dateDay = currOrder && currOrder.date.slice(8,10)
    const formDate = `${dateDay}/${dateMonth}/${dateYear}`

    return (
        <Container>
            <Header>
                <Head>
                    <Logo>
                        <h1>WebMarket</h1>
                    </Logo>
                    <Menu>
                        <button onClick={()=>Navigation(nav, '/')}>Voltar à pagina Principal</button>
                    </Menu>
                </Head>
            </Header>
            <Section>
                <Info>
                    <h2> Entrega para: {currOrder && currOrder.userName}</h2>
                    <h2>Agendada para: {formDate}</h2>
                    <div id="list">
                        <h1>Lista de pedidos</h1>
                        {OrderList}
                        <h3>Valor: {currOrder && currOrder.price} R$</h3>
                        <button onClick={()=>Navigation(nav,`/Update/${params.id}`)}>Editar Pedido</button>
                        <button onClick={reset}>Concluir entrega</button>
                        <button onClick={delOrder}>Excluir pedido</button>
                    </div>
                </Info>
            </Section>
            <Footer>
                <h3 id="contato">{`Entre e contato conosco: (XX) XXXXX-XXXX`}</h3>
            </Footer>
        </Container>
    )
}