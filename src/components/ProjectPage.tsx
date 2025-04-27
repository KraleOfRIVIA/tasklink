import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { taskStore } from '@/stores/taskStore';
import TaskCard from '@/components/tasks/TaskCard';
import TaskModal from '@/components/tasks/TaskModal'; // импортируем модалку
import { Task } from '@/types/ITask';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

const ProjectPage = observer(() => {
  const { id: projectId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Partial<Task> | undefined>();

  useEffect(() => {
    if (projectId) {
      taskStore.fetchTasksByProject(projectId);
    }
  }, [projectId]);

  const handleOpenModal = (task?: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(undefined);
    setModalOpen(false);
  };

  const handleSubmit = async (taskData: Partial<Task>) => {
    if (!projectId) return;

    if (editingTask?.id) {
      await taskStore.updateTask(editingTask.id, taskData);
    } else {
      await taskStore.createTask(projectId, taskData);
    }

    handleCloseModal();
  };

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/projects">Проекты</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Проект #{projectId}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Задачи проекта</h1>
        <Button onClick={() => handleOpenModal()}>Создать задачу</Button>
      </div>

      {taskStore.loading ? (
        <p>Загрузка задач...</p>
      ) : taskStore.tasks.length === 0 ? (
        <p>Задач пока нет</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskStore.tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={() => handleOpenModal(task)} />
          ))}
        </div>
      )}

      <TaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
});

export default ProjectPage;
