import styled,{css} from "styled-components"

const FieldTest = styled.div`
    display:inline-block;
    padding:6px 8px;
    background:gray;
    color:black;
    font-size: 13px;
    border-radius : 5px;
    margin:0 4px 10px;
    ${(props:any)=>
        (props.chose)&& css`
            background-color:#3867FF;
            color:white;
        `
    }
`


export default function FiledStyle({children,...props}:any) {
    return (
        <FieldTest type="button" {...props}>{children}</FieldTest>
    )
}