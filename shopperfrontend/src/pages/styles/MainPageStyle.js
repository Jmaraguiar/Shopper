import styled from "styled-components";
import banner1 from "../../assets/images/Banner1.jpg"

export const Container = styled.div`
max-width: 100vw;
`

export const Header = styled.header`
max-width: 100vw;
max-height: 100vh;
color: #E51000;
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
background-color: #014C6E;

@media screen and (min-width: 770px){
        flex-direction: column;
    }

h1{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    font-family: 'Montserrat Alternates', sans-serif;
    @media screen and (min-width: 770px){
        font-size: 3vw;
    }
}
`

export const Logo = styled.div`
margin-left: 20px;

@media screen and (max-width: 780px){
        margin-left: 0px;
    }
`

export const Menu = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
align-items: center;
margin-right: 20px;
gap: 20px;

@media screen and (max-width: 780px){
        flex-direction: column;
        display: none;
    }

ul{
    width: 40vw;
    display: flex;
    align-items: center;
    list-style: none;
    gap: 10px;

    li{
        background-color: black;
        color: white;
        font-weight: bolder;
        text-align: center;
        width: 100%;
        border: solid 1px black;
        border-radius: 5px;

        a{
            text-decoration: none;
            color: white;

            :Hover{
            color: #E51000;
        }
        }
    }

}

button{
    background-color: #E51000;
    font-size: 20px;
    font-weight: bolder;
    height: 50px;
    width: 20vw;
    border: none;
    border-radius: 10px;

    :hover{
        color: white;
        cursor: pointer;
    }
}
`

export const Banner = styled.div`
height: 100vh;
width: 100%;
background-image: url(${banner1});
background-repeat: no-repeat;
background-size: cover;
margin-bottom: 30px;
`

export const Head = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px;

@media screen and (max-width: 780px){
        flex-direction: column;
    }
`

export const Section = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const Sobre = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

button{
    background-color: #E51000;
    font-size: 20px;
    font-weight: bolder;
    height: 50px;
    width: 90vw;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    border-radius: 10px;

    :hover{
        color: white;
        cursor: pointer;
    }

    @media screen and (min-width: 770px){
        display: none;
    }
}

h2{
    text-align: center;
    width: 100%;
    background-color: #014C6E
}

#S1{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px;

    img{
        width: 300px;
    }

    p{
        width: 500px;
    }

    @media screen and (max-width: 770px){
        flex-direction: column;

        p{
            width: 300px;
        }
    }
}

#S2{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px;

    img{
        width: 300px;
    }

    p{
        width: 500px;
    }

    @media screen and (max-width: 770px){
        flex-direction: column-reverse;

        p{
            width: 300px;
        }
    }
}

#S3{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px;

    img{
        width: 300px;
    }

    p{
        width: 500px;
    }

    @media screen and (max-width: 770px){
        flex-direction: column;

        p{
            width: 300px;
        }
    }
}
`

export const Footer = styled.footer`
height: 100px;
display: flex;
justify-content: center;
align-items: center;
background-color: #014C6E;
color: white;
`