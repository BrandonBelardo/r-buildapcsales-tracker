import styled from "styled-components";
import { useState } from "react";


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Calculator = styled.div`
    display: flex;
    width: 80vw;
    margin: 50px auto;
    justify-content: space-between  ;
`;

const Input = styled.input`
    font-size: 20px;
    border-radius: 4px;
    line-height: 1.5;
    padding: 5px 10px;
    transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
    border: 2px solid #dee1e2;
    color: rgb(14, 14, 16);
    background: #dee1e2;
    display: block;
    height: 30px;
    :hover {
        border-color: #ccc;
    }
    :focus{
        border-color: #9147ff;
        background: #fff;
    }
                
`;

const Plus = styled.div`
    margin: 5px auto;
    font-size: 30px;

`;

const Equals = styled.div`
    margin: 5px auto;
    font-size: 30px;

`;

const Result = styled.div`
    margin: 5px auto;
    font-size: 30px;
`;


export default function Add(){
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);
    
    if (isNaN(val1) || !isFinite(val1)){
        setVal1(0);
    }
    if (isNaN(val2) || !isFinite(val2)){
        setVal2(0);
    }
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const sum = val1 + val2;
    return (
        <Container>
            <Calculator>
                <Input value={val1} onChange={(e) => setVal1(Number(e.target.value))}></Input> 
                <Plus>+</Plus>
                <Input value={val2} onChange={(e) => setVal2(Number(e.target.value))}></Input> 
                <Equals>=</Equals>
                <Result>{numberWithCommas(sum)}</Result>
            </Calculator>
        </Container>
    );


}