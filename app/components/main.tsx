import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <div className="p-8 gap-16 flex flex-col gap-4 ml-52 mt-16">
      {children}
    </div>
  );
}
