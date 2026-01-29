import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from './dialog.service';
import { Dialog } from './dialog';
import { provideZonelessChangeDetection } from '@angular/core';


describe('DialogService', () => {
    let service: DialogService;
    let matDialog: jasmine.SpyObj<MatDialog>;

    beforeEach(() => {
        const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        TestBed.configureTestingModule({
            providers: [
                DialogService,
                { provide: MatDialog, useValue: matDialogSpy },
                provideZonelessChangeDetection()
            ]
        });

        service = TestBed.inject(DialogService);
        matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open dialog with correct parameters', () => {
        const mockDialogRef = {} as MatDialogRef<Dialog, any>;
        matDialog.open.and.returnValue(mockDialogRef);

        const title = 'Error';
        const content = 'Something went wrong';

        service.openDialog(title, content);

        expect(matDialog.open).toHaveBeenCalledTimes(1);
        expect(matDialog.open).toHaveBeenCalledWith(Dialog, {
            width: '250px',
            enterAnimationDuration: '0ms',
            exitAnimationDuration: '0ms',
            data: {
                title,
                content
            }
        });
    });

    it('should handle multiple calls correctly', () => {
        matDialog.open.and.returnValue({} as MatDialogRef<Dialog, any>);

        service.openDialog('Title 1', 'Content 1');
        service.openDialog('Title 2', 'Content 2');

        expect(matDialog.open).toHaveBeenCalledTimes(2);
        expect(matDialog.open.calls.argsFor(0)[1]!.data).toEqual({ title: 'Title 1', content: 'Content 1' });
        expect(matDialog.open.calls.argsFor(1)[1]!.data).toEqual({ title: 'Title 2', content: 'Content 2' });
    });
});
