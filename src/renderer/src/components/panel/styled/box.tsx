import styled from 'styled-components';

export const PanelBox = styled.div`
    margin-top: 5px;
    border:1px solid #336caf;
    border-radius: 3px;
    .panel-title{
        font-size: 1.6rem;
        color:#fff;
        padding: 4px 6px;
        background-color: #336caf;
    }
    .panel-content{
        padding: 0;
        overflow-x: auto;
        /* background-color: #fff; */
    }
`;