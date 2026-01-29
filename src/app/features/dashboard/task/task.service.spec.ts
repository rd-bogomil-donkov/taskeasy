import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { ITask } from './task.model';
import { UserService } from '../../../core/user/user.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TaskService', () => {
  let service: TaskService;
  let userServiceMock: Partial<UserService>;
  let store: Record<string, string> = {};

  beforeEach(() => {
    userServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue([
        { name: 'Alice' },
        { name: 'Bob' }
      ])
    };

    store = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: UserService, useValue: userServiceMock },
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(TaskService);
  });

  it('should initialize tasks and filteredTasks from localStorage', () => {
    store['tasks'] = JSON.stringify([
      { id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo' }
    ]);
    const newService = TestBed.inject(TaskService);
    expect(newService.filteredTasks()).toHaveSize(1);
  });

  it('should add a new task', () => {
    const task: ITask = {
      id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo',
      description: ''
    };
    service.addTask(task);

    expect(service.tasks()).toContain(task);
    expect(service.filteredTasks()).toContain(task);
    expect(store['tasks']).toContain('"id":"1"');
  });

  it('should remove a task', () => {
    const task: ITask = {
      id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo',
      description: ''
    };
    service.addTask(task);

    service.removeTask(task);

    expect(service.tasks()).not.toContain(task);
    expect(service.filteredTasks()).not.toContain(task);
    expect(store['tasks']).not.toContain('"id":1');
  });

  it('should update a task', () => {
    const task: ITask = {
      id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo',
      description: ''
    };
    service.addTask(task);

    const updatedTask = { ...task, status: 'done' as 'done' };
    service.updateTask(updatedTask);

    expect(service.tasks()[0].status).toBe('done');
    expect(service.filteredTasks()[0].status).toBe('done');
    expect(store['tasks']).toContain('"status":"done"');
  });

  it('should update task status', () => {
    const task: ITask = {
      id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo',
      description: ''
    };
    service.addTask(task);

    service.updateTaskStatus(task, 'in-progress');

    expect(service.tasks()[0].status).toBe('in-progress');
    expect(service.filteredTasks()[0].status).toBe('in-progress');
    expect(store['tasks']).toContain('"status":"in-progress"');
  });

  it('should reset filteredTasks', () => {
    const task1: ITask = {
      id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo',
      description: ''
    };
    const task2: ITask = {
      id: '2', project: 'P2', assignee: 'Bob', estimation: '5', status: 'todo',
      description: ''
    };
    service.addTask(task1);
    service.addTask(task2);

    service.filteredTasks.set([task1]); // simulate filtering
    service.resetFilters();

    expect(service.filteredTasks()).toEqual(service.tasks());
  });

  it('should filter tasks correctly', () => {
    const task1: ITask = {
      id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo',
      description: ''
    };
    const task2: ITask = {
      id: '2', project: 'P2', assignee: 'Bob', estimation: '5', status: 'todo',
      description: ''
    };
    service.addTask(task1);
    service.addTask(task2);

    service.filterTasks('P1', 'Alice', '3');

    expect(service.filteredTasks()).toEqual([task1]);
  });

  it('should compute projects and assignees correctly', () => {
    const task1: ITask = {
      id: '1', project: 'P1', assignee: 'Alice', estimation: '3', status: 'todo',
      description: ''
    };
    const task2: ITask = {
      id: '2', project: 'P2', assignee: 'Bob', estimation: '5', status: 'todo',
      description: ''
    };
    service.addTask(task1);
    service.addTask(task2);

    expect(service.projects()).toEqual(['P1', 'P2']);
    expect(service.assignees()).toEqual(['Alice', 'Bob']);
  });
});
