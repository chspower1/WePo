import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 10px 10px 15px ${(props) => props.theme.boxShadowGrayColor};
    padding: 60px 50px;
    margin-bottom: 40px;
    background: ${(props) => props.theme.cardColor};

    @media screen and (max-width: 960px) {
        margin-top: 40px;
    }

    @media screen and (max-width: 500px) {
        padding: 25px;
    }
`;
export const TitleBox = styled.div`
    width: 100%;
    color: ${(props) => props.theme.textColor};
`;
export const Title = styled.h2`
    font-size: 25px;
    font-weight: 900;
    margin-bottom: 60px;

    @media screen and (max-width: 500px) {
        font-size: 18px;
    }
`;
export const ContentContainer = styled.div`
    width: 80%;
    height: auto;

    @media screen and (max-width: 500px) {
        width: 100%;
    }
`;
export const ContentBox = styled.div`
    width: 100%;
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 500px) {
        display: flex;
    }
`;
export const ContentName = styled.h2`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 15px;
    color: ${(props) => props.theme.textColor};
`;
export const ContentAccent = styled.p`
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
    max-width: 90%;
    margin-right: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${(props) => props.theme.btnColor}; ;
`;
export const ContentDetail = styled.p`
    font-size: 15px;
    max-width: 90%;
    padding: 10px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color:  ${props=> props.theme.subTextColor};
`;
export const ContentDesc = styled.p`
    font-size: 15px;
    padding: 0 80px 30px 0;
    margin-bottom: 20px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-bottom: 1px solid #e9e9e9;
    color: ${(props) => props.theme.textColor};
`;
export const ContentDate = styled.p`
    font-size: 13px;
    color: ${(props) => props.theme.contentColor};
    padding: 10px 0 10px;
    margin-bottom: 10px;
`;
export const EditButton = styled.button`
    width: 27px;
    height: 27px;
    outline: 0;
    position: absolute;
    right: 30px;
    top: 10px;
`;
export const DeleteButton = styled.button`
    width: 27px;
    height: 27px;
    outline: 0;
    position: absolute;
    right: 0px;
    top: 10px;
`;
export const AddButton = styled.button`
    width: 40px;
    height: 40px;
    margin: 50px 0 0;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${(props) => props.theme.btnColor};
    transition: all 0.4s ease;
    &:hover {
        background-color: ${(props) => props.theme.accentColor};
    }
`;

export const AddInput = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
    width: ${(props) => props.width}px;
    border-radius: 3px;
    border: 0;
    border: solid 1px ${(props) => props.theme.btnColor};
    margin-bottom: 10px;
    padding: 8px 10px;
`;

export const AddInputBox = styled.div`
    width: auto;
    height: auto;
    display: ${(props) => props.style?.display || "flex"};
    flex-direction: column;
    margin-bottom: 30px;
`;
export const RequiredLabel = styled.span`
    color: ${(props) => props.theme.btnColor};
`;

export const Button = styled.button`
    background-color: ${(props) => props.color || "white"};
    color: ${(props) => (props.color ? "white" : "default")};
    border: ${(props) => !props.color && "1px solid #7A7A7A"};
    width: 80px;
    height: 40px;
    border-radius: 10px;
    margin: 0 10px;
`;
export const MajorGraduate = styled.input.attrs((props) => ({
  type: "radio",
  name: props.name,
  value: props.value,
}))``;

export const MajorGraduateLabel = styled.label`
    margin-right: 10px;
    color: ${(props) => props.theme.textColor};

    @media screen and (max-width: 500px) {
        font-size: 14px;
    }
`;
export const Root = styled.div`
    background: ${(props) => props.theme.bgColor};
    min-height: 100%;
    display: flex;
`;
export const MyPortWrap = styled.div`
    position: relative;
    width: 100%;
    max-width: 1300px;
    display: flex;
    justify-content: flex-end;
    margin: 80px auto 0;
    padding: 80px 30px;
    @media screen and (max-width: 960px) {
        flex-direction: column;
    }

    @media screen and (max-width: 500px) {
        padding: 150px 0 0;
    }
`;
export const Wrap = styled.div`
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    @media screen and (max-width: 960px) {
        margin-left: 0;
        max-width: 100%;
        padding: 0 20px;
    }
`;
export const UserCardBox = styled.div`
    max-width: 380px;
    @media screen and (max-width: 960px) {
        max-width: 100%;
    }
`;
export const ImportantTxt = styled.div`
    position: absolute;
    right: 60px;
    top: 50px;
    color: ${(props) => props.theme.textColor};
    font-size: 13px;
    @media screen and (max-width: 960px) {
        top: 30px;
        right: 20px;
    }
`;
export const SubmitOrCencerBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px 0;
`;
