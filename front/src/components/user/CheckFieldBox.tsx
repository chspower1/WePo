import { checkedBoxValue } from "@/atoms";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
const SelectBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 0 0 30px;
`;

const CheckBoxWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    user-select: none;
`;

const LoadingBox = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    user-select: none;
`;
export default function CheckFieldBox() {
    const [selectCheckBoxValues, setSelectCheckBoxValues] = useRecoilState(checkedBoxValue);
    function handleCheckedBox(name: string) {
        setSelectCheckBoxValues((current) => {
            const currentChecked = [...current];
            const overlap = currentChecked.findIndex((el) => el === name);
            overlap === -1 ? currentChecked.push(name) : currentChecked.splice(overlap, 1);
            return currentChecked;
        });
    }
    return (
        <SelectBox>
            <CheckBoxWrap>
                <input
                    type="checkbox"
                    name="category"
                    id="frontEnd"
                    value="frontEnd"
                    onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                />
                <Label htmlFor="frontEnd">프론트엔드</Label>
            </CheckBoxWrap>
            <CheckBoxWrap>
                <input
                    type="checkbox"
                    name="category"
                    id="backEnd"
                    value="backEnd"
                    onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                />
                <Label htmlFor="backEnd">백엔드</Label>
            </CheckBoxWrap>
            <CheckBoxWrap>
                <input
                    type="checkbox"
                    name="category"
                    id="dataAnalysis"
                    value="dataAnalysis"
                    onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                />
                <Label htmlFor="dataAnalysis">데이터분석</Label>
            </CheckBoxWrap>
            <CheckBoxWrap>
                <input
                    type="checkbox"
                    name="category"
                    id="AI"
                    value="AI"
                    onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                />
                <Label htmlFor="AI">AI</Label>
            </CheckBoxWrap>
        </SelectBox>
    );
}
