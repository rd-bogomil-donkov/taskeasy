import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Dialog } from "./dialog";

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private readonly dialog = inject(MatDialog);

    openDialog(title: string, content: string): void {
        this.dialog.open(Dialog, {
            width: '250px',
            enterAnimationDuration: '0ms',
            exitAnimationDuration: '0ms',
            data: {
                title: title,
                content: content
            }
        });
    }
}