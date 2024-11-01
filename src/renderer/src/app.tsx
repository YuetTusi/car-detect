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
  theme
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { blue } from './theme/blue';
import { GlobalStyle } from './styled/global';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);


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