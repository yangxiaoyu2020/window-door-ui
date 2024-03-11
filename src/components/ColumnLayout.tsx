// ColumnLayout.tsx

import React, { ReactNode } from 'react';
import './ColumnLayout.css'; // 导入样式文件

// 声明 ColumnLayoutProps 类型，指定 children 属性为 ReactNode 类型
interface ColumnLayoutProps {
  children?: ReactNode;
}

// 使用 ColumnLayoutProps 类型作为泛型参数
const ColumnLayout: React.FC<ColumnLayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="sidebar">
        {/* 侧边栏内容 */}
        Sidebar Content
      </div>
      <div className="main-content">
        {/* 主要内容区域 */}
        {children}
      </div>
    </div>
  );
};

export default ColumnLayout;
