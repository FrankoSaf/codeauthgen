import React, { useContext } from 'react'
import { Context } from '../../store/Context';
import styled from "styled-components";
import ReactDOM from "react-dom";


export default function Modal({children}) {

    const {setOpenModal } = useContext(Context);



  return ReactDOM.createPortal(
    <ModalContainer>
        <Backdrop onClick={()=>setOpenModal(false)}></Backdrop>
        <Frontdrop>
            {children}
        </Frontdrop>
    </ModalContainer>,document.querySelector('#portal')
  )
}

const ModalContainer = styled.div`
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
`
const Backdrop = styled.div`
    position: absolute;
    z-index: 4;
    height: 100%;
    width: 100%;
    opacity: 0.8;
    background-color:black;
    
`
const Frontdrop = styled.div`
    width: 30%;
    height: 30%;
    position: absolute;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 480px) {
        width: 50%;
    }
`