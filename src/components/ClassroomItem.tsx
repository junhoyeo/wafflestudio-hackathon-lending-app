import { GraduationCapIcon } from 'lucide-react';

import { cn } from '@/utils';

import { Badge } from './ui/badge';

export type Classroom = {
  id: number;
  name: string;
};
export type ClassroomItemProps = Classroom & {
  className?: string;
  selected?: boolean;
  onClick?: () => void;
};

export const ClassroomItem: React.FC<ClassroomItemProps> = ({
  className,
  name,
  selected,
  onClick,
}) => {
  return (
    <li
      className={cn(
        'flex items-center gap-2 border border-solid border-slate-200 rounded-lg',
        'px-3 py-1.5 shadow-sm bg-white',
        onClick &&
          'cursor-pointer hover:bg-slate-100 transition-colors duration-200 ease-in-out',
        className,
      )}
      onClick={onClick}
    >
      <GraduationCapIcon className="text-slate-700" size={18} />
      <span className="font-medium tracking-tight text-slate-700">{name}</span>
      {selected && <Badge>선택됨</Badge>}
    </li>
  );
};
