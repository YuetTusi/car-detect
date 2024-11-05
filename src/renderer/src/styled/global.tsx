import { createGlobalStyle } from 'styled-components';

/**
 * 全局公共样式
 */
export const GlobalStyle = createGlobalStyle`

    html{
        font-size: 62.5%;
        margin: 0;
        padding: 0;
        width: auto;
        height: 100%;
    }
    body{
        position: relative;
        margin: 0;
        padding: 0;
        width: auto;
        height: 100%;
        background-color: #f6f7f9;
    }
    #app{
        width:auto;
        height: 100%;
        color:#222;
        font-size: 2rem;
        /* font-weight: 400; */
        font-family: "Microsoft YaHei","NSimSun","Arial";
    }

    .fn-hidden{
        display: none;
    }
    .fn-show{
        display: block;
    }
    .fn-align-right{
        text-align: right;
    }
    .fn-align-center{
        text-align: center;
    }

    //Webkit滚动条样式
    ::-webkit-scrollbar {
        width: 10px;
		height: 10px;
    }
	::-webkit-scrollbar:horizontal{
		width: 10px;
		height: 10px;
	}
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ddd;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
    ::-webkit-scrollbar-thumb:hover{
        background: #ccc;
    }
    ::-webkit-scrollbar-thumb:active{
        background: #999;
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: #c1c1c1;
    }
`;