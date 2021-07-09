import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GitrepoService } from '../../service/gitrepo.service';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators'
import { SearchInfo } from '../../search/search-info';
import * as moment from 'moment';

@Component({
  selector: 'app-search-repository',
  templateUrl: './search-repository.component.html',
  styleUrls: ['./search-repository.component.scss']
})
export class SearchRepositoryComponent implements OnInit {
  @ViewChild('gitSearchInput', { static: true }) gitSearchInput: any;
  searchValue: any;
  moment: any = moment;
  repositories: any = [];
  constructor(private service: GitrepoService) {
  }

  ngOnInit(): void {
    fromEvent(this.gitSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
        if (event.target.value === '') { this.repositories = [] }
      }), 
      filter(res => res.length > 0), 
      debounceTime(600), 
      distinctUntilChanged()
    ).subscribe((repoText: any) => {
      let reqData = {
        perPage: 10,
        keyword: repoText,
        page: 1
      };
      this.service.getRepository(reqData).subscribe(response => {
        this.repositories = response['items'];
        console.log(this.repositories);
      });
    });
  }
}
