import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <div className="p-8 flex flex-col gap-4 min-h-mainbody box-border">
      {children}
    </div>
  );
}
