import styled from "styled-components";

export const Container = styled.div`
height: 100vh;
width: 100vw;
background-color: #014C6E;
color: #E51000;
display: flex;
justify-content: center;
align-items: center;

h1{
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 15vw;
    @media screen and (min-width: 770px){
        font-size: 6vw;
    }
}
`