import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { workerData } from 'worker_threads';
import path from 'path';

async function isReactComponent(filePath) {
  try {
    // 获取文件的绝对路径
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    
    // 动态导入模块
    const module = await import(absolutePath);
    
    // 获取实际的组件函数
    const componentFn = typeof module === 'function' ? module : module?.default;

    if (!componentFn || typeof componentFn !== 'function') {
      return false;
    }

    // 准备一些模拟的 props
    const mockProps = {};
    
    try {
      // 尝试服务端渲染组件
      const html = ReactDOMServer.renderToString(React.createElement(componentFn, mockProps));
      
      // 如果能成功渲染为 HTML，说明是有效的 React 组件
      return typeof html === 'string' && html.length > 0;
    } catch (error) {
      // 如果渲染失败，检查错误是否与 React 相关
      const errorString = error.toString().toLowerCase();
      return errorString.includes('react') || errorString.includes('jsx') || errorString.includes('element');
    }
  } catch (error) {
    console.error('Error checking component:', error);
    return false;
  }
}

// 从命令行参数获取文件路径
const filePath = process.argv[2];

if (!filePath) {
  console.error('请提供文件路径作为参数');
  process.exit(1);
}

// 检测是否为 React 组件并输出结果
isReactComponent(filePath).then(isReact => {
  process.exit(isReact ? 1 : 0); // 返回 1 表示是 React 组件，0 表示不是
}).catch(error => {
  console.error('检测过程出错:', error);
  process.exit(1);
});
