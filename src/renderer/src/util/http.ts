type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

const urlPrefix = 'http://127.0.0.1:8081/';

export interface HttpResult<T = Record<string, any>> {
  /**
   * 结果数据
   */
  data: T | null;
  /**
   * 成功
   */
  success: boolean;
  /**
   * 错误消息
   */
  error_message: string;
}

/**
 * 发送HTTP请求
 * @param url URL
 * @param data 数据
 * @param method 方法
 */
export async function request<T = any>(
  url: string,
  data: Record<string, any> | undefined | null,
  method: HttpMethods = 'GET',
): Promise<HttpResult<T>> {
  const fullUrl = url.startsWith('http') ? url : urlPrefix + url;

  let body: any = undefined;
  if (method !== 'GET') {
    if (data === undefined || data === null) {
      body = undefined;
    } else {
      body = JSON.stringify(data);
    }
  }

  const res = await fetch(fullUrl, {
    method,
    body,
    headers: { 'Content-Type': 'application/json;charset=utf8' },
    mode: 'cors', //跨域请求
  });

  const json: HttpResult<T> = await res.json();

  return json;
}
