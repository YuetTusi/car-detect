import styled from 'styled-components';


export const ResultTableBox = styled.table`
    
    width:100%;
    font-size: 1.4rem;
    border:0;
    border-spacing: 0;
    border-collapse:collapse;

    tr{
        border-bottom:1px solid #d9d9d9;
        &:nth-child(even){
            background-color: #fff;
        }
        td{
            padding: 4px 4px;
            border-right: 1px solid #d9d9d9;
            &:last-child{
                border-right:none;
            }
        }
    }
`;