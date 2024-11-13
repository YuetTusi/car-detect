
import { FC } from 'react';
import { Panel } from '@renderer/components/panel';
import { BandTable } from './band-table';
import { RfTable } from './rf-table';
import { LocationTable } from './location-table';
import { Category } from './styled/box';
import { Dashboard4gProp } from './prop';

const Dashboard4g: FC<Dashboard4gProp> = () => {

    return <div style={{ margin: '5px' }}>
        <Panel title="4G">
            <Category>
                <fieldset>
                    <legend>设备</legend>
                    <div style={{ padding: '14px' }}>
                        <BandTable />
                    </div>
                </fieldset>
            </Category>
            <Category>
                <fieldset>
                    <legend>侦码</legend>
                    <div style={{ padding: '14px' }}>
                        <RfTable />
                    </div>
                </fieldset>
            </Category>
            <Category>
                <fieldset>
                    <legend>定位</legend>
                    <div style={{ padding: '14px' }}>
                        <LocationTable />
                    </div>
                </fieldset>
            </Category>
        </Panel>
    </div>;
};

export { Dashboard4g };