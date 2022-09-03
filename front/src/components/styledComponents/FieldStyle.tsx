import styled, { css } from "styled-components";

const FieldTest = styled.label`
    display: inline-block;
    padding: 6px 8px;
    background: gray;
    color: black;
    font-size: 14px;
    border-radius: 5px;
    margin: 0 4px 10px;
    cursor: pointer;
    user-select: none;
    transition: all 0.4s ease;
    ${(props: any) =>
    props.chose &&
    css`
            background-color: ${(props) => props.theme.filedBgColor};
            color: white;
        `}
    &:hover {
        background: #86baff;
    }
`;

export default function FiledStyle({ children, ...props }: any) {
  return <FieldTest {...props}>{children}</FieldTest>;
}
