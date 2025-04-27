import { Task } from '@/types/ITask';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil } from 'lucide-react';

type Props = {
  task: Task;
  onEdit?: () => void; // <-- добавляем поддержку редактирования
};

const TaskCard = ({ task, onEdit }: Props) => {
  return (
    <Card
      className="rounded-2xl shadow-md hover:shadow-lg transition relative group cursor-pointer"
      onClick={onEdit} // <-- делаем всю карточку кликабельной
    >
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
        <div className="text-xs text-gray-500">
          <div>Статус: {task.status}</div>
          <div>Дедлайн: {new Date(task.deadline).toLocaleDateString()}</div>
          <div>Создано: {new Date(task.created_at).toLocaleString()}</div>
        </div>

        {/* Иконка редактирования появляется при наведении */}
        {onEdit && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
