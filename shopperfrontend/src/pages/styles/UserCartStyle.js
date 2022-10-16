import styled from "styled-components";

export const Container = styled.div`

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


export const Head = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px;

@media screen and (max-width: 780px){
        justify-content: center;
    }
`

export const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
text-align: center;
min-height: 80vh;

h2{
    margin-bottom: 10px;
}

#test{
    border: 1px solid black;
    padding: 20px;
    margin: 20px;
}
`

export const Info = styled.div`

#list{
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    h1{
        margin-bottom: 20px;
    }

    @media screen and (max-width: 780px){
        width: 80vw;
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
text-align: center;
`