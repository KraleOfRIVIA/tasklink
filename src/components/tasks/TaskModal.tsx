import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/types/ITask";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  initialData?: Partial<Task>;
}

export default function TaskModal({ open, onClose, onSubmit, initialData }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [status, setStatus] = useState("в работе");
  const [deadline, setDeadline] = useState<Date | undefined>();

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setAssignedTo(initialData?.assigned_to || null);
    setStatus(initialData?.status || "в работе");
    setDeadline(initialData?.deadline ? new Date(initialData.deadline) : undefined);
  }, [initialData]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title,
      description,
      assigned_to: assignedTo,
      status,
      deadline: deadline ? deadline.toISOString().split("T")[0] : undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Редактировать задачу" : "Создать задачу"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Название</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <Label>Описание</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div>
            <Label>Ответственный (ID пользователя)</Label>
            <Input value={assignedTo || ""} onChange={(e) => setAssignedTo(e.target.value)} />
          </div>

          <div>
            <Label>Статус</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="в работе">в работе</SelectItem>
                <SelectItem value="завершена">завершена</SelectItem>
                <SelectItem value="в ожидании">в ожидании</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
  <Label>Дедлайн</Label>
  <Input
    type="date"
    value={deadline ? deadline.toISOString().split("T")[0] : ""}
    onChange={(e) => {
      const value = e.target.value;
      setDeadline(value ? new Date(value) : undefined);
    }}
  />
</div>

        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Сохранить" : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}