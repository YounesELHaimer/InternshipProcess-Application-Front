import { Component, EventEmitter, Input, Output, OnInit, ViewChild, } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-afficher-encadrant',
  templateUrl: './afficher-encadrant.component.html',
  styleUrls: ['./afficher-encadrant.component.css']
})
export class AfficherEncadrantComponent {
  @Input() encadrant: any;
  @Output() closePopupEvent = new EventEmitter<void>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nom', 'prenom', 'email','departement'];

  constructor(
    private _liveAnnouncer: LiveAnnouncer) {}

    @ViewChild(MatSort) sort: MatSort = new MatSort();

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
  
  ngOnInit() {
    console.log (this.encadrant)
    this.dataSource.data = Array.isArray(this.encadrant) ? this.encadrant : [this.encadrant];
  }

  closePopup() {
    this.closePopupEvent.emit();
  }
}
