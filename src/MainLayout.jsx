import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="main_layout">
      {children}
      <div className="watermark">Выполнил Мясников Иван Витальевич</div>
    </div>
  );
}
