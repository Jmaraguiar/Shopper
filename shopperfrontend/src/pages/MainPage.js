import { Banner, Container, Footer, Head, Header, Logo, Menu, Products, Promo, Section, Sobre } from "./styles/MainPageStyle"
import banner2 from "../assets/images/Banner2.jpg"
import banner3 from "../assets/images/Banner3.jpg"
import banner4 from "../assets/images/Banner4.jpg"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/BaseURL"
import { useNavigate } from "react-router-dom"
import { Navigation } from "../routes/cordinator"


export const MainPage = (props) => {
    const [products,setProducts] = useState()
    const nav = useNavigate()

    const getProducts = ()=>{
        axios.get(`${BASE_URL}/getAllProducts`)
        .then(res=>{
            setProducts(res.data.products)
        }).catch(err=>{
            alert(err.response.data)
        })
    }

    useEffect(()=>{
        getProducts()
    },[])


    return (
        <Container>
            <Header>
                <Head>
                    <Logo>
                        <h1>WebMarket</h1>
                    </Logo>
                    <Menu>
                        <ul>
                            <li><a href='#sobre'>Quem Somos</a></li>
                            <li><a href='#contato'>Contato</a></li>
                        </ul>
                        <button onClick={()=>Navigation(nav,'/Order')}>Faça Sua Encomenda</button>
                    </Menu>
                </Head>
                <Banner/>
            </Header>
            <Section>
                <Sobre id="sobre">
                    <h2>Quem Somos</h2>
                    <div id="S1">
                        <img src={banner4}/>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                            qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div id="S2">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                            qui officia deserunt mollit anim id est laborum."
                        </p>
                        <img src={banner2}/>
                    </div>
                    <div id="S3">
                        <img src={banner3}/>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                            qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <button onClick={()=>Navigation(nav,'/Order')}>Faça Sua Encomenda</button>
                </Sobre>
            </Section>
            <Footer>
                <h3 id="contato">{`Entre e contato conosco: (XX) XXXXX-XXXX`}</h3>
            </Footer>
        </Container>
    )
}