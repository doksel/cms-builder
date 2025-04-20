'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Folder } from 'lucide-react';

interface PageNode {
  id: string;
  name: string;
  children?: PageNode[];
}

const pageTree: PageNode[] = [
  {
    id: '1',
    name: 'Главная',
    children: [
      {
        id: '1-1',
        name: 'О компании',
      },
      {
        id: '1-2',
        name: 'Контакты',
      },
    ],
  },
  {
    id: '2',
    name: 'Блог',
    children: [
      {
        id: '2-1',
        name: 'Пост 1',
      },
    ],
  },
];

function TreeNode({ node }: { node: PageNode }) {
  const [open, setOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="pl-2">
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-black text-gray-700"
        onClick={() => setOpen(!open)}
      >
        {hasChildren ? <Folder size={16} /> : <FileText size={16} />}
        <span>{node.name}</span>
      </div>
      {open && hasChildren && (
        <div className="ml-4">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-white border-r transition-all duration-200 ${
        collapsed ? 'w-12' : 'w-64'
      } flex flex-col`}
    >
      <div className="p-2 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-black"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      {!collapsed && (
        <div className="overflow-auto px-2">
          <h2 className="text-sm font-bold mb-2 text-gray-500">Страницы</h2>
          {pageTree.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  );
}
