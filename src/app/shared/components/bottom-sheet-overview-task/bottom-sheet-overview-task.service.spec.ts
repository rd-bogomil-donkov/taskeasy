import { TestBed } from '@angular/core/testing';
import { BottomSheetOverviewTaskService } from './bottom-sheet-overview-task.service';
import { TaskService } from '../../../features/dashboard/task/task.service';
import { UserService } from '../../../core/user/user.service';
import { DialogService } from '../dialog/dialog.service';
import { ITask } from '../../../features/dashboard/task/task.model';
import { provideZonelessChangeDetection } from '@angular/core';


describe('BottomSheetOverviewTaskService', () => {
    let service: BottomSheetOverviewTaskService;
    let taskService: jasmine.SpyObj<TaskService>;
    let userService: jasmine.SpyObj<UserService>;
    let dialogService: jasmine.SpyObj<DialogService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BottomSheetOverviewTaskService,
                {
                    provide: TaskService,
                    useValue: jasmine.createSpyObj('TaskService', ['addTask', 'updateTask'])
                },
                {
                    provide: UserService,
                    useValue: jasmine.createSpyObj('UserService', ['getUsers'])
                },
                {
                    provide: DialogService,
                    useValue: jasmine.createSpyObj('DialogService', ['openDialog'])
                },
                provideZonelessChangeDetection()
            ]
        });

        service = TestBed.inject(BottomSheetOverviewTaskService);
        taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    });

    const validBottomSheetTask: IBottomSheetOverviewTask = {
        project: 'Skyline',
        assignee: 'Elena Carter',
        estimation: '3',
        description: 'Some description'
    };

    describe('createTask()', () => {
        it('should create a task when input is valid', () => {
            service.createTask(validBottomSheetTask);

            expect(taskService.addTask).toHaveBeenCalledTimes(1);
            expect(taskService.addTask).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    project: 'Skyline',
                    assignee: 'Elena Carter',
                    estimation: '3',
                    description: 'Some description',
                    status: 'todo',
                    id: jasmine.any(String)
                })
            );

            expect(dialogService.openDialog).not.toHaveBeenCalled();
        });

        it('should show error dialog when project is missing', () => {
            service.createTask({ ...validBottomSheetTask, project: '' });

            expect(dialogService.openDialog).toHaveBeenCalledWith(
                'Error',
                'Please enter project'
            );
            expect(taskService.addTask).not.toHaveBeenCalled();
        });

        it('should show error dialog when assignee is missing', () => {
            service.createTask({ ...validBottomSheetTask, assignee: '' });

            expect(dialogService.openDialog).toHaveBeenCalledWith(
                'Error',
                'Please select assignee'
            );
            expect(taskService.addTask).not.toHaveBeenCalled();
        });

        it('should show error dialog when estimation is missing', () => {
            service.createTask({ ...validBottomSheetTask, estimation: '' });

            expect(dialogService.openDialog).toHaveBeenCalledWith(
                'Error',
                'Please select estimation'
            );
            expect(taskService.addTask).not.toHaveBeenCalled();
        });
    });

    describe('editTask()', () => {
        const existingTask: ITask = {
            id: 'task-id-123',
            project: 'Old Project',
            assignee: 'Old User',
            estimation: '1',
            description: 'Old description',
            status: 'in-progress'
        };

        it('should update task when input is valid', () => {
            service.editTask(existingTask, validBottomSheetTask);

            expect(taskService.updateTask).toHaveBeenCalledTimes(1);
            expect(taskService.updateTask).toHaveBeenCalledWith({
                id: 'task-id-123',
                project: 'Skyline',
                assignee: 'Elena Carter',
                estimation: '3',
                description: 'Some description',
                status: 'in-progress'
            });

            expect(dialogService.openDialog).not.toHaveBeenCalled();
        });

        it('should show error dialog when validation fails', () => {
            service.editTask(existingTask, { ...validBottomSheetTask, project: '' });

            expect(dialogService.openDialog).toHaveBeenCalledWith(
                'Error',
                'Please enter project'
            );
            expect(taskService.updateTask).not.toHaveBeenCalled();
        });
    });

    describe('getTaskData()', () => {
        it('should map ITask to IBottomSheetOverviewTask', () => {
            const task: ITask = {
                id: '1',
                project: 'Nebula',
                assignee: 'Liam Thompson',
                estimation: '5',
                description: 'Test',
                status: 'todo'
            };

            const result = service.getTaskData(task);

            expect(result).toEqual({
                project: 'Nebula',
                assignee: 'Liam Thompson',
                estimation: '5',
                description: 'Test'
            });
        });
    });

    describe('getAssignees()', () => {
        it('should return list of user names', () => {
            userService.getUsers.and.returnValue([
                { name: 'Elena Carter' },
                { name: 'Bogomil Donkov' }
            ] as any);

            const result = service.getAssignees();

            expect(result).toEqual(['Elena Carter', 'Bogomil Donkov']);
            expect(userService.getUsers).toHaveBeenCalled();
        });
    });
});
