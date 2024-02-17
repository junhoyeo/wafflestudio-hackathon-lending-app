import { CheckIcon, GraduationCapIcon } from 'lucide-react';

import { cn } from '@/utils';

export type Classroom = {
  name: string;
};
export type ClassroomItemProps = Classroom & {
  className?: string;
  selected?: boolean;
  onClick?: () => void;
};

const transformName = (name: string) => {
  // `303동 404호` -> 그대로 렌더링하되, ' ' split하고, 호로 끝나는 경우 단어 전체(404호) 를 text-pink-400으로 렌더링
  const split = name.split(' ');
  const last = split[split.length - 1];
  if (last.endsWith('호')) {
    split[split.length - 1] =
      `<span class="text-pink-500">${last.substring(0, last.length - 1)}</span>호`;
  }

  return split.join(' ');
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
          !selected &&
          'cursor-pointer hover:bg-slate-100 transition-colors duration-200 ease-in-out',
        selected && 'bg-pink-50 border border-solid border-pink-400',
        className,
      )}
      onClick={onClick}
    >
      <GraduationCapIcon className="text-slate-700" size={18} />
      <span
        className="font-medium tracking-tight text-slate-700"
        dangerouslySetInnerHTML={{ __html: transformName(name) }}
      />
      {selected && (
        <span className="ml-auto bg-pink-400 w-[18px] h-[18px] rounded-full flex items-center justify-center">
          <CheckIcon size={13} strokeWidth={4} className="text-pink-50" />
        </span>
      )}
    </li>
  );
};
