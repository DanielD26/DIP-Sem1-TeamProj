import {
  MdbTablePaginationComponent,
  MdbTableDirective,
} from 'angular-bootstrap-md';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { TeamServiceService } from 'src/app/services/team-service.service';
import { Player } from 'src/app/models/Player';
import { Subscription } from 'rxjs';
import { ViewServiceService } from 'src/app/services/view-service.service';
import { Router } from '@angular/router';
import { ITeam } from 'src/app/models/Team';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  elements: any = [];
  previous: any = [];
  headElements = ['RK', 'PLAYER_NAME', 'PER'];
  statusString: string;
  filerList: any;
  filerData: any;
  playerList: Player[];
  Team: any;

  searchText;

  id: string;
  subscription: Subscription;

  @ViewChild('teamName') teamNameInp: ElementRef;
  newTeam: ITeam;

  constructor(
    private _api: TeamServiceService,
    private cdRef: ChangeDetectorRef,
    private data: ViewServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this._api
      .getAllPlayers()
      .subscribe((unpackedPlayers) => (this.playerList = unpackedPlayers));

    this.subscription = this.data.currentMessage.subscribe(
      (id) => (this.id = id)
    );

    if (this.id == 'default message') {
      this.router.navigate(['/teams']);
    }

    this.data.viewTeam(this.id).subscribe((res) => {
      this.Team = res;
    });

    //   this.playerList.forEach(players => {
    //     this.filerData.RK = players.RK;
    //     this.filerData.PLAYER_NAME = players.PLAYER_NAME;
    //     this.filerData.PER = players.PER;
    //     this.filerList.push(this.filerData);
    //  });
    //   console.log("Coordinates list: " + this.filerList);

    //     this.playerList = this.playerList.filter(ar => !this.Team.players.find(rm => (rm.PLAYER_NAME === ar.PLAYER_NAME) ))

    const result = this.playerList ? this.playerList.length : 520;

    for (let i = 1; i <= result; i++) {
      this.elements.push({
        RK: 'RK',
        PLAYER_NAME: 'PLAYER_NAME',
        PER: 'PER',
      });
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(6);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  goBack() {
    this.router.navigate(['/teams']);
  }
  get result() {
    return this.playerList.filter((item) => item.CHECKED);
  }
  get reresult() {
    return this.Team.players.filter((item) => item.CHECKED);
  }
  putEditTeam() {
    const finalList = this.reresult.concat(this.result);
    let teamName = this.teamNameInp.nativeElement.value;

    this.newTeam = {
      teamName: teamName,
      players: finalList as any,
    };
    // put this.newTeam here //
    this._api.updateTeam(this.newTeam, this.id).subscribe((res: any) => {
      this.statusString = 'Team Successfully Edited!';
      if (teamName == '') {
        {
          this.statusString = 'Team Cannot Be Empty!';
        }
      }
    });
  }
}
