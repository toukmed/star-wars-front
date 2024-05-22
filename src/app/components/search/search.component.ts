import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../model/Person';
import {SearchService} from "../../services/search.service";
import {MatTableDataSource} from '@angular/material/table';
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";
import {GraphqlService} from "../../services/graphql.service";
import {SnackBarService} from "../../services/snakbar.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {DetailsDialogComponent} from "../details-dialog/details-dialog.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'birth_year', 'films', 'vehicles', 'bookmark'];
  people: Person[] = [];
  dbBasedPeople: Person[] = [];
  dataSource: MatTableDataSource<any>;
  dbBaseddataSource: MatTableDataSource<any>;
  totalElements: number = 0;
  pageSize: number = 0;
  pageNo: number = 0;
  pageEvent: PageEvent;
  enableNamesFetchFlag: boolean;

  @ViewChild('searchBox', {static: true}) searchBox!: ElementRef;

  constructor(private searchService: SearchService,
              private graphqlService: GraphqlService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.enableNamesFetchFlag = false;
    this.searchDbByName();
    this.searchPeople();
  }

  ngAfterViewInit(): void {
    let nativeElement = this.searchBox.nativeElement;
    nativeElement.subscribe(
      fromEvent(nativeElement, 'keyup')
        .pipe(
          map((i: any) => i.currentTarget.value),
          debounceTime(500),
          distinctUntilChanged())
        .subscribe(event => {
          this.searchPeople(nativeElement.value);
        })
    );
  }

  searchPeople(keyword?: string) {
    this.searchService.search('people', keyword).subscribe(data => {
      this.people = [];
      this.totalElements = data['count']
      this.pageSize = data['results'].length;

      for (let i = 0; i < data['results'].length; i++) {
        let person = new Person();
        person.name = data['results'][i].name;
        person.birthYear = data['results'][i].birth_year;
        if(!this.enableNamesFetchFlag){
          person.films = this.search(data['results'][i].films);
          person.vehicles = this.search(data['results'][i].vehicles);
        }else{
          person.films = data['results'][i].films;
          person.vehicles = data['results'][i].vehicles;
        }

        this.people.push(person);
      }
      this.updateBookmarkedStatus();
      this.dataSource = new MatTableDataSource(this.people);
    })
  }

  searchDbByName(name?: string) {
    this.dbBasedPeople = [];
    this.graphqlService.searchPerson(name).subscribe(result => {
      this.dbBasedPeople = result['data']['person'];
      this.dbBaseddataSource = new MatTableDataSource(this.dbBasedPeople)
    })
  }

  search(filmPaths: string[]) {
    let elements: string[] = []
    for (let i = 0; i < filmPaths.length; i++) {
      let path = filmPaths[i].substring(22);
      this.searchService.search(path).subscribe(data => {
        if (path.includes('film')) {
          elements.push(data['title'])
        }
        if (path.includes('vehicle')) {
          elements.push(data['name'])
        }
      })
    }
    return elements;
  }

  nextPage(event: PageEvent) {
    this.pageEvent = event;
    this.pageSize = event.pageSize;
    this.pageNo = event.pageIndex;
    console.log(this.pageNo)
    this.searchPeople(this.searchBox.nativeElement.value + '&page=' + this.pageNo);
  }

  bookmark(event: any, bookmarked: boolean) {
    if(!bookmarked){
      this.dialog.open(DialogComponent, {
        data: {
          person: event,
          action: 'bookmark'
        },
        disableClose: true,
      }).afterClosed().subscribe((data) => {
        if(data === undefined){
          this.dataSource.data.forEach(person => {
            if (person.name === event.name) {
              person.bookmarked = true;
            }
          });
          this.searchDbByName();
        }

      })
    }
  }

  unbookmark(event: any) {

    this.dialog.open(DialogComponent, {
      data: {
        person: event,
        action: 'unbookmark'
      },
      disableClose: true,
    }).afterClosed().subscribe(() => {
      this.dataSource.data.forEach(person => {
        if (person.name === event.name) {
          person.bookmarked = false;
        }
      });
      this.searchDbByName();
    })

  }

  updateBookmarkedStatus(): void {
    this.dbBasedPeople.forEach(person1 => {
      this.people.forEach(person2 => {
        if (person1.name === person2.name) {
          person2.bookmarked = true;
        }
      });
    });
  }

  fetchDetails(element: any, type: string){
    if(this.enableNamesFetchFlag){
      if(type === 'people'){
        this.searchService.search(type, element['name']).subscribe(data => {
          this.dialog.open(DetailsDialogComponent, {
            data: {
              element: data['results'][0],
              type: type
            },
          })
        })
      }else{
        let uri = element.substring(22);
        this.searchService.search(uri).subscribe(data => {
          this.dialog.open(DetailsDialogComponent, {
            data: {
              element: data,
              type: type
            },
          })
        })
      }

    }

  }

}
