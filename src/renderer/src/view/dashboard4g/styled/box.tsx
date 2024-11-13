import styled from 'styled-components';


export const ResultTableBox = styled.table`
    
    font-size: 1.4rem;
    border:0;
    width: 100%;
    border-spacing: 0;
    border-collapse:collapse;

    tr{
        border:1px solid #d9d9d9;
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

export const Category = styled.div`

    display: flex;
    flex-direction: row;
    padding: 14px;
    /* margin-top: 14px; */

    &>fieldset{
        margin:0;
        padding:0;
        width: 100%;
        border:1px solid #336caf;
        border-radius: 2px;
        &>legend{
            margin:0 0 0 2rem;
            padding:0 1rem;
            color:#fff;
            background-color: #336caf;
            border-radius: 2px;
        }
    }
`;