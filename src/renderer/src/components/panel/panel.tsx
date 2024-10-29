import { FC } from 'react';
import { PanelProp } from './prop';
import { PanelBox } from './styled/box';

const Panel: FC<PanelProp> = ({ title, children }) => {

    return <PanelBox>
        <div className="panel-title">{title}</div>
        <div className="panel-content">
            {children}
        </div>
    </PanelBox>;
};

export { Panel };