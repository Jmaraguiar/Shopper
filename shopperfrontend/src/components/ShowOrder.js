import styled from "styled-components"

export const ShowOrder = (props)=>{

    const Container = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items:center ;
        gap: 20px;
        border-bottom: 1px solid black;

        #del{
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 100%;
            background-color: transparent;

            :hover{
                background-color: red;
                cursor: pointer;
            }
        }
    `

    const Text = styled.div`
    
    `


    return(
        <Container>
            <Text>
                <h5>{props.name}</h5>
                <h5>Quantidade: {props.qty}</h5>
            </Text>
        </Container>
    )
}