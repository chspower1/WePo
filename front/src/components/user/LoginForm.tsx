import { useRecoilState, useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserLogin } from '@api/api';
import { isLoginState, IUser } from '../../atoms';
import { curUserState } from '@/atoms';
import * as LoginStyled from '@styledComponents/SignStyled';
import { EyeOffOutline, EyeOutline } from 'styled-icons/evaicons-outline';
import { useCookies } from 'react-cookie';
export interface ILogin {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [cookies, setCookies, removeCookies] = useCookies(['rememberEmail', 'rememberPassword']);
  const [viewPassword, setViewPassword] = useState(false);
  const [isEmailRemember, setIsEmailRemember] = useState(false);
  // const [isPasswordRemember, setIsPasswordRemember] = useState(false);
  const [curUser, setCurUser] = useRecoilState(curUserState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ILogin>({
    mode: 'onChange',
    defaultValues: {
      email: `${cookies.rememberEmail}`
    }
  });
  const location = useLocation();
  const pathName = location.pathname;
  const isLogin = useRecoilValue(isLoginState);
  const navigator = useNavigate();

  const onvalid = async (formData: ILogin) => {
    try {
      const newUser = await UserLogin({ ...formData });
      await setCurUser(newUser!);
    } catch (err) {
      alert('일치하지 않습니다!');
    }
  };

  //첫 랜더시
  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setIsEmailRemember(true);
    }
    if (cookies.rememberEmail === '') {
      setError('email', {
        type: 'costom',
        message: '이메일을 입력해 주세요'
      });
      setIsEmailRemember(false);
    }
    if (cookies.rememberEmail === undefined) {
      setCookies('rememberEmail', '');
    }
    if (!cookies.rememberEmail) {
      setCookies('rememberEmail', '');
    }
    setError('password', {
      type: 'custom',
      message: '비밀번호를 입력해 주세요'
    });
  }, []);

  //로그인상황이 바뀔시
  useEffect(() => {
    if (isLogin) {
      if (isEmailRemember) {
        setCookies('rememberEmail', curUser?.email!, { maxAge: 360000 });
      } else {
        setCookies('rememberEmail', '');
      }
      navigator('/mypage', { replace: true });
    }
  }, [isLogin]);

  function handleViewButton(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setViewPassword((prev) => !prev);
  }

  //자동로그인 & 아이디 저장 OnClick시
  function onChangeAtuoLogin(e: React.FormEvent<HTMLInputElement>) {
    console.log(e.currentTarget.name);
    console.log(e.currentTarget.checked);
    setIsEmailRemember(e.currentTarget.checked);
    if (e.currentTarget.checked === false) setCookies('rememberEmail', '');
  }
  return (
    <LoginStyled.Root>
      <LoginStyled.Wrapper className={pathName === '/login' ? 'login' : ''}>
        <LoginStyled.FromContainer>
          <LoginStyled.TitleBox>
            <LoginStyled.Title>로그인</LoginStyled.Title>
          </LoginStyled.TitleBox>
          <form onSubmit={handleSubmit(onvalid)}>
            <LoginStyled.InputBox>
              <LoginStyled.Input
                type="text"
                placeholder="이메일을 입력하세요"
                {...register('email', {
                  required: '이메일을 입력해 주세요',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: '이메일 형식에 맞지 않습니다!'
                  }
                })}
              />
              {errors.email && (
                <LoginStyled.ErrMsg>
                  <LoginStyled.DangerIcon />
                  {errors.email.message}
                </LoginStyled.ErrMsg>
              )}
            </LoginStyled.InputBox>
            <LoginStyled.InputBox>
              <LoginStyled.InputInnerBox>
                <LoginStyled.Input
                  type={viewPassword ? 'text' : 'password'}
                  className="password"
                  placeholder="비밀번호를 입력하세요"
                  {...register('password', {
                    required: '비밀번호를 입력해 주세요',
                    minLength: {
                      value: 4,
                      message: '비밀번호는 4글자 이상입니다!'
                    }
                  })}
                />
                <LoginStyled.ViewButton tabIndex={-1} onMouseDown={handleViewButton}>
                  {viewPassword ? <EyeOutline color="#3687FF" /> : <EyeOffOutline color="#3687FF" />}
                </LoginStyled.ViewButton>
              </LoginStyled.InputInnerBox>
              {errors.password && (
                <LoginStyled.ErrMsg>
                  <LoginStyled.DangerIcon />
                  {errors.password.message}
                </LoginStyled.ErrMsg>
              )}
            </LoginStyled.InputBox>
            <div>
              <input type="checkbox" name="rememberId" checked={isEmailRemember} onClick={onChangeAtuoLogin} id="rememberId" />
              <LoginStyled.RememberIdLabel htmlFor="rememberId" style={{ userSelect: 'none' }}>
                이메일 기억하기
              </LoginStyled.RememberIdLabel>
            </div>
            <LoginStyled.SubmitButtonBox>
              <LoginStyled.SubmitButton>로그인</LoginStyled.SubmitButton>
            </LoginStyled.SubmitButtonBox>
          </form>
          <LoginStyled.RegisterCommentBox>
            아직 회원이 아니신가요?
            <Link to="/register">
              <LoginStyled.RegisterButton>회원가입</LoginStyled.RegisterButton>
            </Link>
          </LoginStyled.RegisterCommentBox>
        </LoginStyled.FromContainer>
      </LoginStyled.Wrapper>
    </LoginStyled.Root>
  );
}
