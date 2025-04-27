import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import { Task } from "@/types/ITask";
  
  interface Props {
    task: Task;
    onSubmit: (minutes: number, comment?: string) => void;
  }
  
  export default function AddTimeDrawer({ task, onSubmit }: Props) {
    const [open, setOpen] = useState(false);
    const [minutes, setMinutes] = useState("");
    const [comment, setComment] = useState("");
  
    const handleSubmit = () => {
      const time = parseInt(minutes);
      if (!isNaN(time) && time > 0) {
        onSubmit(time, comment);
        setOpen(false);
        setMinutes("");
        setComment("");
      }
    };
  
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="secondary" size="sm">Добавить время</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Добавить время</DrawerTitle>
            <DrawerDescription>{task.title}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <Input
              type="number"
              placeholder="Время в минутах"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <Input
              placeholder="Комментарий (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button onClick={handleSubmit} className="bg-blue-600">Сохранить</Button>
            <DrawerClose asChild>
              <Button variant="outline">Отмена</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  