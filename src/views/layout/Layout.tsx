// layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header>This is the header</header>
      {/* <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/table">Table</a></li>
          <li><a href="/graph">Graph</a></li>
          <li><a href="/demo">Demo</a></li>
        </ul>
      </nav> */}
      <main>{children}</main>
      <footer>This is the footer</footer>
    </div>
  );
};

export default Layout;
