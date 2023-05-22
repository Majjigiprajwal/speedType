import {createGlobalStyle} from "styled-components"


export const GlobalStyles=createGlobalStyle`

*{
    box-sizing:border-box;
}
body{
    background:${({theme})=>theme.background};
    color:${({theme})=>theme.typeBoxText};
    padding:0;
    margin:0;
    transition:all 0.25s linear;
}

.canvas{
    display:grid;
    min-height:100vh;
    grid-auto-flow:row;
    grid-template-row:auto 1fr auto;
    gap:0.5rem;
    padding:2rem;
    width:100vw;
    align-items:center;
    text-align:center;
}

.typing-box{
    display:block;
    max-width:1000px;
    height:140px;
    margin-left:auto;
    margin-right:auto;
    overflow:hidden;
}

.words{
    font-size:32px;
    display:flex;
    flex-wrap:wrap;
    color:rgb(82, 103, 119);
}
.word{
    margin:5px;
    padding-right:2px;
}

.hidden-input{
 opacity:0;
}

.current{
    border-left:1px solid;
    animation:blinking 2s infinite;
    animation-timing-function:ease;




    @keyframes blinking{
        0%{border-left-color:${(theme)=>theme.typeBoxText};}
        25%{border-left-color:${(theme)=>theme.background};}
        50%{border-left-color:${(theme)=>theme.typeBoxText};}
        75%{border-left-color:${(theme)=>theme.background};}
        100%{border-left-color:${(theme)=>theme.typeBoxText};}
    }
}

.current-right{
    border-right:1px solid;
    animation:blinkingRight 2s infinite;
    animation-timing-function:ease;



    @keyframes blinkingRight{
        0%{border-right-color:${(theme)=>theme.typeBoxText};}
        25%{border-right-color:${(theme)=>theme.background};}
        50%{border-right-color:${(theme)=>theme.typeBoxText};}
        75%{border-right-color:${(theme)=>theme.background};}
        100%{border-right-color:${(theme)=>theme.typeBoxText};}
    }
}

.correct{
    color:${({theme})=>theme.typeBoxText};
}

.incorrect{
    color:red;
}

.upper-menu{
    display:flex;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    font-size:1.35rem;
    justify-content:space-between;
    padding:0.5rem;
}

.modes{
    display:flex;
    gap:0.4rem;
}

.time-mode:hover{
    color:green;
    cursor:pointer;
}

.footer{
    width:1000px;
    display:flex;
    justify-content:space-between;
    margin-left:auto;
    margin-right:auto;
}

.stats-box{
    display:flex;
    width:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
}

.left-stat{
    width:30%;
    padding:30px;
}

.right-stat{
    width:70%
}

.title{
    font-size:20px;
    color:${(theme)=>theme.typeBoxText};
}

.subtitle{
    font-size:30px;
}

.header{
    display:flex;
    width:1000px;
    justify-content:space-between;
    margin-left:auto;
    margin-right:auto;
}

.user-profile{
    width :1000px;
    margin :auto;
    display :flex;
    height :15rem;
    color:black;
    background : ${({theme})=>theme.typeBoxText};
    border-radius : 20px;
    justify-content : center;
    padding:1rem;
    align-text : center;
    padding : 1rem;
}

.user-profile{
    width: 1000px;
    margin: auto;
    display: flex;
    min-height: 15rem;
    background: ${({theme})=>theme.typeBoxText};
    border-radius: 20px;
    justify-content: center;
    align-text: center;
}
.user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}
.info{
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}
.picture{
    width: 40%;
}
.total-tests{
    width: 50%;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table, .graph-user-page{
   margin: auto;
   width: 1000px;
   height:500px;
}

.center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content:center;
    align-items:center;
}
`