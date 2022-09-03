import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { MagnifyingGlass } from '@styled-icons/foundation/MagnifyingGlass';
import { useSetRecoilState } from 'recoil';
import { searchWordState } from '@/atoms';
import { useEffect } from 'react';

const SearchBox = styled.form`
  position: relative;
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    width: 80%;
    margin-bottom: -100px;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 15px;
  border-radius: 25px;
  text-align: center;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.btnColor};
  outline: 0;
  &:focus {
    outline: 2px solid ${(props) => props.theme.btnColor};
  }
`;
const Button = styled.button`
  position: absolute;
  right: 10px;
  color: ${(props) => props.theme.btnColor};
  transition: color 0.4s ease;
  transform: scaleX(-1);
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

export default function SearchBar() {
  const setSearchWord = useSetRecoilState(searchWordState);
  const { register, handleSubmit, watch } = useForm();
  const onvalid = ({ search }: any) => {
    setSearchWord(search);
  };
  useEffect(() => {
    setSearchWord(watch('search'));
  }, [watch('search')]);

  return (
    <SearchBox onSubmit={handleSubmit(onvalid)}>
      <Input type="text" placeholder="찾고싶은 정보를 검색해주세요!" {...register('search')} />
      <Button>
        <MagnifyingGlass size={24} />
      </Button>
    </SearchBox>
  );
}
