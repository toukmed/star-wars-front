import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GraphqlService} from "../../services/graphql.service";
import {SnackBarService} from "../../services/snakbar.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private graphqlService: GraphqlService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
  }

  onConfirm() {
    if (this.data['action'] === 'unbookmark') {
      this.graphqlService.deletePerson(this.data['person'].id).subscribe(() => {
        this.snackBarService.openSuccess('unbookmarked successfully');
      });
    }

    if (this.data['action'] === 'bookmark') {
      this.graphqlService.createPerson(this.data['person']).subscribe(() => {
        this.data.bookmarked = true;
        this.snackBarService.openSuccess('bookmarked successfully');
      });

    }
  }

}
