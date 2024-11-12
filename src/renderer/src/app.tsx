import log from 'electron-log/renderer';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ThemeProvider } from 'styled-components';
import { ViewRouter } from './router';
import Crash from './components/crash';
import {
  App as AntdApp,
  ConfigProvider,
  Empty,
  theme,
  message
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { blue } from './theme/blue';
import { GlobalStyle } from './styled/global';
import { request } from './util/http';
import { default4gSetting, default2gSetting } from '@renderer/util/helper';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

//界面启动，开启射频
(async (): Promise<void> => {
  console.clear();
  try {
    const [res4g, res2g] = await Promise.all([
      request('/api/v1/enable4GRF', default4gSetting, 'POST'),
      request('/api/v1/enable2GRF', default2gSetting, 'POST')
    ]);

    if (res4g.success && res2g.success) {
      message.success('已开启射频');
    } else {
      message.warning('开启射频失败');
    }
  } catch (error) {
    log.error(`启动失败 ${error.message}`);
  }
})();

const App = (): JSX.Element => <ConfigProvider
  theme={{
    token: { ...blue },
    algorithm: theme.defaultAlgorithm
  }}
  renderEmpty={() =>
    <Empty
      description="暂无数据"
      image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }
  locale={zhCN}
  componentSize="middle">
  <AntdApp>
    <ThemeProvider theme={blue}>
      <GlobalStyle />
      <Crash>
        <ViewRouter />
      </Crash>
      {/* <ViewRouter /> */}
    </ThemeProvider>
  </AntdApp>
</ConfigProvider>;

export { App };