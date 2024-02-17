import React, { useMemo, useState } from 'react';

import { Classroom, ClassroomItem } from '@/components/ClassroomItem';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';

import bananaCatCryingImage from '../../assets/banana-cat-crying.gif';

type SearchClassroomDrawerProps = {
  currentClassroom?: Classroom | null;
  classrooms: Classroom[];
  onSelectClassroom: (value: Classroom) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};
export const SearchClassroomDrawer: React.FC<SearchClassroomDrawerProps> = ({
  currentClassroom,
  classrooms,
  onSelectClassroom,
  open,
  setOpen,
}) => {
  const [query, setQuery] = useState<string>('');

  const filteredClassrooms = useMemo(
    () => classrooms.filter((item) => item.name.includes(query)),
    [classrooms, query],
  );

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <DrawerContent className="w-full max-w-[500px] mx-auto">
        <DrawerHeader>
          <DrawerTitle>강의실 검색</DrawerTitle>
          <DrawerDescription>이런 강의실이 있었넹~!</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 p-4 pb-0">
          <Input
            autoFocus
            className="text-lg bg-slate-100"
            placeholder="검색하세여"
            value={query}
            onChange={(e) => setQuery(e.target.value.trim())}
          />

          <ul className="flex flex-col gap-1">
            {filteredClassrooms.map((item, idx) => (
              <ClassroomItem
                key={idx}
                {...item}
                selected={item.name === currentClassroom?.name}
                onClick={() => {
                  onSelectClassroom(item);
                }}
              />
            ))}

            {filteredClassrooms.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full gap-3 py-6 rounded-lg bg-slate-100">
                <img
                  className="w-[156px] h-[156px] rounded-md"
                  alt="icon"
                  src={bananaCatCryingImage}
                />

                <h3 className="font-medium text-slate-700">
                  그런 강의실은 없는데요;
                </h3>
              </div>
            )}
          </ul>
        </div>

        <DrawerFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            취소
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
