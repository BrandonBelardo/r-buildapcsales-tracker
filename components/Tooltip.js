import styled from "styled-components";
import { useState } from "react";

export default function Tooltip({ children }) {
    const [show, setShow] = useState(false);

    return (
        <TooltipContainer
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            ? {show && <TooltipText>{ children }</TooltipText>}
        </TooltipContainer>
    );
    return (
        <TooltipContainer
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(true)}
        >
            ? {show && <TooltipText>{ children }</TooltipText>}
        </TooltipContainer>
    );
};

const TooltipContainer = styled.span`
    display: inline-block;
    position: relative;
    margin-left: 10px;
    cursor: pointer;
    font-size: 14px;
    background-color: rgb(67, 111, 182);
    width: 18px;
    height: 18px;
    text-align: center;
    border-radius: 50%;
    visibility: visible;
    transition: visibility 1s;
`;

const TooltipText = styled.span`
    background-color: rgba(0, 0, 0, 0.9);
    text-align: left;
    cursor: auto;
    padding: 8px;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    bottom: 120%;
    transform: translateX(-50%);
    width: 200px;
    font-size: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;