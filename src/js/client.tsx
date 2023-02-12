import React from "react";
import { createRoot } from 'react-dom/client';
import Todos from "./components/Todos";

// document.getElementById: HTMLElement | null
// createRoot(container: HTMLElement | DocumentFlagment)
// ↑このことから、containerの型をHtmlElementにしても、null許可しても、tscコンパイラに怒られる
// const container: HTMLElement = document.getElementById('root');

// 型アサーションで解決する
const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(
  <Todos/>
);
