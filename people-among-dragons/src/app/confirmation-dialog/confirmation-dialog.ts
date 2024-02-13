import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.css']
})
export class ConfirmationDialog implements OnInit {

  constructor(    
    @Inject(MAT_DIALOG_DATA) public dialogData: {confirmationText: string},
    public dialogRef: MatDialogRef<ConfirmationDialog>
    ) { }

  ngOnInit(): void {
  }

  confirmChoice(): void{
    this.dialogRef.close(true);
  }

  rejectChoice(): void{
    this.dialogRef.close(false);
  }

}
