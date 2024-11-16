import { FC } from 'react';

/**
 * 错误描述
 */
const ErrorMessage: FC<{ error: Error | undefined }> = ({ error }) => {

    const now = new Date();

    if (error) {
        console.warn('堆栈消息：');
        console.error(error.stack);
        return <div>
            <div style={{ color: '#c40000', paddingTop: '2rem' }}>{error.message}</div>
            <div style={{ color: '#e17604', paddingTop: '2rem', width: '600px' }}>{error.stack}</div>
            <div>
                {now.toLocaleString()}
            </div>
        </div>;
    } else {
        return <div style={{ color: '#e17604' }}>
            <div>
                {now.toLocaleString()}
            </div>
        </div>;
    }
};

export { ErrorMessage };