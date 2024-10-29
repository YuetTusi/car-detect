import styled from 'styled-components';


export const LayoutBox = styled.div`

    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;

    display: flex;
    flex-direction: row;

    .fn-button-group{
        border:1px solid #d29d49;
        border-radius: 3px;
        display: flex;
        flex-direction: row;
        margin: 5px;
        &>.fn-button{
            cursor: pointer;
            flex:1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 4px 4px;
            border: none;
            border-right: 1px solid #d29d49;
            background-color: #fdc46a;
            &:hover{
                background-color: #dea346;
            }
            &:active{
                background-color: #dea346;
            }
            &:last-child{
                border-right:none;
            }
            &>.anticon{
                font-size: 2rem;
            }
            &>span{
                padding-top: 8px;
            }
        }
    }

    &>.layout-left{
        flex:none;
        width: 300px;
        height: 100%;
        position: relative;
        /* border-right: 1px solid #d6d8e1; */
        &>.layout-logo{
            height: 60px;
            background-color: #2f619e;
            border-right: 1px solid #2f619e;
            color:#fff;
            font-size: 2.2rem;
            font-family: "Microsoft Yahei";
            font-weight:lighter;
            text-align: center;
            line-height: 60px;
            &>span{
                padding-left: .5rem;
            }
        }
        &>.layout-fn{
            position:absolute;
            top:60px;
            left:0;
            bottom:0;
            right:0;
            border-right: 1px solid #d6d8e1;
        }
    }
    &>.layout-right{
        flex:1;
        height: 100%;
    }

    .layout-header{
        height: 60px;
        background-color: #336caf;
    }
`;