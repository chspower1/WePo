import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { changePassword } from "@api/api";
import { useForm } from "react-hook-form";
import { EyeOffOutline, EyeOutline } from "styled-icons/evaicons-outline";
import { DangerIcon, ErrMsg } from "@styledComponents/SignStyled";

const Wrapper = styled.div`
    z-index: 1007;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
    width: 400px;
    height: 600px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;
    background-color: ${(props) => props.theme.bgColor};
`;
const ModalInnerBox = styled.div`
    width: 80%;
    height: auto;
`;
const ModalHeader = styled.h1`
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.textColor};
`;

const InputBox = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
`;
const ChangePasswordInput = styled.input`
    width: 100%;
    height: 50px;
    border-radius: 7px;
    outline: 0;
    padding: 0 20px;
    margin-bottom: 10px;
    border: none;
    box-shadow: 5px 4px 5px ${(props) => props.theme.boxShadowGrayColor};
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.inputBgColor};
    &::placeholder {
        font-size: 12px;
        color: ${(props) => props.theme.textColor};
        font-family: "Elice";
    }
    &:focus {
        border: 2px solid #3687ff;
    }
    &.password {
        font-family: sans-serif;
        letter-spacing: 1px;
    }
    &.password[type="password"] {
        color: #3687ff;
    }
    &.password[type="text"] {
        color: ${(props) => props.theme.textColor};
    }
`;
const RequiredElement = styled.span`
    color: #f24b5d;
`;
const ModalHeaderBox = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 10px;
`;

const SubmitButton = styled.button`
    background: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    width: 100px;
    height: 40px;
    border-radius: 10px;
    margin-right: 15px;
    transition: all 0.4s ease;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    &:hover {
        background: ${(props) => props.theme.accentColor};
    }
`;
const ExitButton = styled.button`
    background: #f24b5d;
    color: white;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    transition: all 0.4s ease;
    &:hover {
        background: #db3142;
    }
`;
const ViewButton = styled.button`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-70%);
`;
const SuccessMsg = styled.p`
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #198754;
    margin: 0 0 0 5px;
`;
interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  newCheckPassword: string;
}

export default function ChangePassword({ setEditPassword }: any) {
  const [viewOldPassword, setViewOldPassword] = useState(false);
  const [viewCheckPassword, setViewCheckPassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<IChangePassword>({ mode: "onChange" });

  const valid = !errors.oldPassword && !errors.newPassword && !errors.newCheckPassword;

  const onvalid = async (data: IChangePassword) => {
    const { oldPassword, newPassword } = data;
    await changePassword(oldPassword, newPassword).then((data) => {
      if (data?.response?.status!) {
        if (data.response.status == 400) {
          alert("?????? ??????????????? ????????????.");
        }
      } else {
        alert("????????? ?????????????????????");
        setEditPassword(false);
      }
    });
  };
  useEffect(() => {
    setError("oldPassword", {
      type: "custom",
      message: "????????? ??????????????? ??????????????????!",
    });
    setError("newPassword", {
      type: "custom",
      message: "????????? ??????????????? ??????????????????!",
    });
    setError("newCheckPassword", {
      type: "custom",
      message: " ????????? ??????????????? ??? ??? ??? ??????????????????!",
    });
  }, []);
  function handleViewOldButton(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setViewOldPassword((prev) => !prev);
  }
  function handleViewButton(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setViewPassword((prev) => !prev);
  }
  function handleViewCheckButton(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setViewCheckPassword((prev) => !prev);
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onvalid)}>
        <Modal>
          <div style={{ width: "100%", textAlign: "center" }}>
            <ModalHeader style={{ fontSize: "24px", fontWeight: "bold" }}>
              ???????????? ??????
            </ModalHeader>
          </div>
          <ModalInnerBox>
            <ModalHeaderBox>
              <RequiredElement>*</RequiredElement>{" "}
              <ModalHeader>?????? ??????????????? ???????????????</ModalHeader>
            </ModalHeaderBox>
            <InputBox>
              <ChangePasswordInput
                className="password"
                type={viewOldPassword ? "text" : "password"}
                placeholder="?????? ????????????"
                {...register("oldPassword", {
                  required: "?????? ??????????????? ??????????????????!",
                  minLength: {
                    value: 4,
                    message: "??????????????? 4?????? ???????????????!",
                  },
                })}
              ></ChangePasswordInput>
              <ViewButton tabIndex={-1} onMouseDown={handleViewOldButton}>
                {viewOldPassword ? (
                  <EyeOutline color="#3687FF" />
                ) : (
                  <EyeOffOutline color="#3687FF" />
                )}
              </ViewButton>
            </InputBox>
            {errors.oldPassword ? (
              <ErrMsg>
                <DangerIcon></DangerIcon>
                {errors.oldPassword.message}
              </ErrMsg>
            ) : (
              <SuccessMsg>??????????????? ????????? ????????? ????????? :-)</SuccessMsg>
            )}
          </ModalInnerBox>
          <ModalInnerBox>
            <ModalHeaderBox>
              <RequiredElement>*</RequiredElement>{" "}
              <ModalHeader>????????? ????????????</ModalHeader>
            </ModalHeaderBox>
            <InputBox>
              <ChangePasswordInput
                className="password"
                placeholder="????????? ????????????"
                type={viewPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "????????? ??????????????? ??????????????????!",
                  minLength: {
                    value: 4,
                    message: "??????????????? 4?????? ???????????????!",
                  },
                })}
              ></ChangePasswordInput>
              <ViewButton tabIndex={-1} onMouseDown={handleViewButton}>
                {viewPassword ? (
                  <EyeOutline color="#3687FF" />
                ) : (
                  <EyeOffOutline color="#3687FF" />
                )}
              </ViewButton>
            </InputBox>
            {errors.newPassword ? (
              <ErrMsg>
                <DangerIcon></DangerIcon>
                {errors.newPassword.message}
              </ErrMsg>
            ) : (
              <SuccessMsg>??????????????? ??????????????????!</SuccessMsg>
            )}
          </ModalInnerBox>
          <ModalInnerBox>
            <ModalHeaderBox>
              <RequiredElement>*</RequiredElement>
              <ModalHeader>????????? ???????????? ??????</ModalHeader>
            </ModalHeaderBox>
            <InputBox>
              <ChangePasswordInput
                className="password"
                placeholder="????????? ???????????? ??????"
                type={viewCheckPassword ? "text" : "password"}
                {...register("newCheckPassword", {
                  required: "??????????????? ???????????? ????????????!",
                  validate: {
                    mathchesPreviousPassword: (value) => {
                      const { newPassword } = getValues();
                      return (
                        newPassword === value ||
                        "??????????????? ???????????? ????????????!"
                      );
                    },
                  },
                })}
              ></ChangePasswordInput>
              <ViewButton tabIndex={-1} onMouseDown={handleViewCheckButton}>
                {viewCheckPassword ? (
                  <EyeOutline color="#3687FF" />
                ) : (
                  <EyeOffOutline color="#3687FF" />
                )}
              </ViewButton>
            </InputBox>
            {errors.newCheckPassword ? (
              <ErrMsg>
                <DangerIcon></DangerIcon>
                {errors.newCheckPassword.message}
              </ErrMsg>
            ) : (
              <SuccessMsg>????????????????????? ???????????????</SuccessMsg>
            )}
          </ModalInnerBox>
          <div>
            <SubmitButton disabled={!valid}>??????</SubmitButton>
            <ExitButton onClick={() => setEditPassword(false)}>??????</ExitButton>
          </div>
        </Modal>
      </form>
    </Wrapper>
  );
}
