import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatchListComponent } from '../../components/match/match-list/match-list.component';
import { MatchCreateComponent } from '../../components/match/match-create/match-create.component';

import { MatchRoutingModule } from './match-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatchRoutingModule,
    MatchListComponent,
    MatchCreateComponent,
  ],
})
export class MatchModule {}
