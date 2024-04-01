import React from 'react';



const ErrorPage404: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="error-page">
      <div className="error-code">
        404
      </div>
      <div className="error-desc">啊哦~ 你所访问的页面不存在</div>
    </div>
  );
};

export default ErrorPage404;
