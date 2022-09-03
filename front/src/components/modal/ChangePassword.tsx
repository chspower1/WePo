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
          alert("현재 비밀번호가 틀립니다.");
        }
      } else {
        alert("변경이 완료되었습니다");
        setEditPassword(false);
      }
    });
  };
  useEffect(() => {
    setError("oldPassword", {
      type: "custom",
      message: "기존의 비밀번호를 입력해주세요!",
    });
    setError("newPassword", {
      type: "custom",
      message: "새로운 비밀번호를 입력해주세요!",
    });
    setError("newCheckPassword", {
      type: "custom",
      message: " 새로운 비밀번호를 한 번 더 입력해주세요!",
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
              비밀번호 변경
            </ModalHeader>
          </div>
          <ModalInnerBox>
            <ModalHeaderBox>
              <RequiredElement>*</RequiredElement>{" "}
              <ModalHeader>현재 비밀번호를 입력하세요</ModalHeader>
            </ModalHeaderBox>
            <InputBox>
              <ChangePasswordInput
                className="password"
                type={viewOldPassword ? "text" : "password"}
                placeholder="현재 비밀번호"
                {...register("oldPassword", {
                  required: "현재 비밀번호를 입력해주세요!",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 4글자 이상입니다!",
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
              <SuccessMsg>비밀번호가 맞는지 확인해 주세요 :-)</SuccessMsg>
            )}
          </ModalInnerBox>
          <ModalInnerBox>
            <ModalHeaderBox>
              <RequiredElement>*</RequiredElement>{" "}
              <ModalHeader>변경할 비밀번호</ModalHeader>
            </ModalHeaderBox>
            <InputBox>
              <ChangePasswordInput
                className="password"
                placeholder="변경할 비밀번호"
                type={viewPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "변경할 비밀번호를 입력해주세요!",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 4글자 이상입니다!",
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
              <SuccessMsg>✔️적합한 비밀번호에요!</SuccessMsg>
            )}
          </ModalInnerBox>
          <ModalInnerBox>
            <ModalHeaderBox>
              <RequiredElement>*</RequiredElement>
              <ModalHeader>변경할 비밀번호 확인</ModalHeader>
            </ModalHeaderBox>
            <InputBox>
              <ChangePasswordInput
                className="password"
                placeholder="변경할 비밀번호 확인"
                type={viewCheckPassword ? "text" : "password"}
                {...register("newCheckPassword", {
                  required: "비밀번호가 일치하지 않습니다!",
                  validate: {
                    mathchesPreviousPassword: (value) => {
                      const { newPassword } = getValues();
                      return (
                        newPassword === value ||
                        "비밀번호가 일치하지 않습니다!"
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
              <SuccessMsg>✔️비밀번호가 일치합니다</SuccessMsg>
            )}
          </ModalInnerBox>
          <div>
            <SubmitButton disabled={!valid}>변경</SubmitButton>
            <ExitButton onClick={() => setEditPassword(false)}>취소</ExitButton>
          </div>
        </Modal>
      </form>
    </Wrapper>
  );
}
