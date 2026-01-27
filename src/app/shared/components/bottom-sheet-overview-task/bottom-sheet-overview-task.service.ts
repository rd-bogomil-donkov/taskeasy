import { inject, Injectable } from "@angular/core";
import { TaskService } from "../../../features/dashboard/task/task.service";
import { UserService } from "../../../core/user/user.service";
import { DialogService } from "../dialog/dialog.service";
import { ITask } from "../../../features/dashboard/task/task.model";

@Injectable({
    providedIn: 'root',
})
export class BottomSheetOverviewTaskService {
    private readonly taskService = inject(TaskService)
    private readonly userService = inject(UserService)
    private readonly dialogService = inject(DialogService)


    createTask(task: IBottomSheetOverviewTask) {
        const [result, message] = this.validateTask(task)
        if (!result) {
            this.dialogService.openDialog('Error', message)
            return
        }

        this.taskService.addTask(
            {
                id: crypto.randomUUID(),
                project: task.project,
                assignee: task.assignee,
                estimation: task.estimation,
                description: task.description,
                status: 'todo'
            }
        )
    }

    editTask(taskData: ITask, task: IBottomSheetOverviewTask) {
        const [result, message] = this.validateTask(task)
        if (!result) {
            this.dialogService.openDialog('Error', message)
            return
        }

        this.taskService.updateTask({
            id: taskData.id,
            assignee: task.assignee,
            project: task.project,
            estimation: task.estimation,
            description: task.description,
            status: taskData.status
        })
    }

    getTaskData(taskData: ITask): IBottomSheetOverviewTask {
        return {
            assignee: taskData.assignee,
            project: taskData.project,
            estimation: taskData.estimation,
            description: taskData.description
        }
    }

    getAssignees(): string[] {
        return this.userService.getUsers().map(u => u.name)
    }

    private validateTask(task: IBottomSheetOverviewTask): [Boolean, string] {
        if (!task.project)
            return [false, 'Please enter project']

        if (!task.assignee)
            return [false, 'Please select assignee']

        if (!task.estimation)
            return [false, 'Please select estimation']

        return [true, '']
    }
}