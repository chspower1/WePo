import styled, { css } from "styled-components";

const FieldTest = styled.label`
    display: inline-block;
    padding: 6px 8px;
    background: gray;
    color: black;
    font-size: 13px;
    border-radius: 5px;
    margin: 0 4px 10px;
    cursor: pointer;

    ${(props: any) =>
        props.chose &&
        css`
            background-color: #3867ff;
            color: white;
        `}
`;

export default function FiledStyle({ children, ...props }: any) {
    return <FieldTest {...props}>{children}</FieldTest>;
}
