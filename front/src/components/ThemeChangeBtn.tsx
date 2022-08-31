import styled, { css } from "styled-components";
import { Sun } from "@styled-icons/octicons/Sun";
import { MoonStarsFill } from "@styled-icons/bootstrap/MoonStarsFill";
import { useRecoilState } from "recoil";
import { isDarkState } from "@/atoms";
const ThemeBtnBox = styled.div`
    position: fixed;
    z-index: 1005;
    right: 50px;
    bottom: 60px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    overflow: hidden;
`;
/* ${(props:any)=>{
        props.light && css`
            
        `
    }} */
const ThemeBtn = styled.button`
    width: 100%;
    height: 100%;
    border: none;
    background: ${(props) => props.theme.modeBgColor};
    transition: all 0.3s ease;
    &:hover {
        opacity: 0.8;
    }
`;
const LightIcon = styled(Sun)`
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme.starFullColor};
`;
const DarkIcon = styled(MoonStarsFill)`
    width: 25px;
    height: 25px;
    color: ${(props) => props.theme.starFullColor};
`;

export default function ThemeChangeBtn() {
    const [isDark, setIsDark] = useRecoilState(isDarkState);
    return (
        <ThemeBtnBox>
            <ThemeBtn
                onClick={() => {
                    setIsDark((prev) => !prev);
                }}
            >
                {isDark ? <LightIcon /> : <DarkIcon />}
            </ThemeBtn>
        </ThemeBtnBox>
    );
}
