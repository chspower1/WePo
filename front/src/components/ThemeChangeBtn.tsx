import styled, { css } from 'styled-components'
import {Sun} from '@styled-icons/octicons/Sun'
import {MoonStarsFill} from '@styled-icons/bootstrap/MoonStarsFill'
import { useRecoilState } from 'recoil'
import { isDarkState } from '@/atoms'
const ThemeBtnBox = styled.div`
    position:fixed;
    z-index:3000;
    right: 50px;
    bottom: 60px;
    width: 60px;
    height: 60px;
    border: 1px solid #000;
    border-radius:50%;
    overflow:hidden;
`
/* ${(props:any)=>{
        props.light && css`
            
        `
    }} */
const ThemeBtn = styled.button`
    width:100%;
    height:100%;
    background:${props=>props.theme.textColor}
`
const LightIcon = styled(Sun)`
    width:30px;
    height:30px;
    color:${props=>props.theme.starFullColor}
`
const DarkIcon = styled(MoonStarsFill)`
    width:25px;
    height:25px;
    color:${props=>props.theme.starFullColor}
`

export default function ThemeChangeBtn() {
    const [isDark, setIsDark] = useRecoilState(isDarkState);
    return (
        <ThemeBtnBox>
            <ThemeBtn onClick={()=>{setIsDark(prev=> !prev)}}>
                {isDark ? <LightIcon/> : <DarkIcon/>}
            </ThemeBtn>
        </ThemeBtnBox>
    )
}
