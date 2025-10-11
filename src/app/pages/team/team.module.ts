import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TeamListComponent } from '../../components/team/team-list/team-list.component';
import { TeamCreateComponent } from '../../components/team/team-create/team-create.component';

import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TeamRoutingModule,
    TeamListComponent,
    TeamCreateComponent,
  ],
})
export class TeamModule {}
