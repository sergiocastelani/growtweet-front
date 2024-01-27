import { ReactNode } from "react";
import { styled } from "styled-components";

export interface ModalProps 
{
    children: ReactNode;
};

export function Modal(props: ModalProps)
{
    const { children } = props;

    return (
        <Backdrop>
            <Dialog>
                {children}
            </Dialog>
        </Backdrop>
    );
}

const Backdrop = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Dialog = styled.div`
    max-width: 90%;
    max-height: 95%;
    background-color: white;
    color: black;
    border-radius: 10px;
    padding: 1rem;
`;

