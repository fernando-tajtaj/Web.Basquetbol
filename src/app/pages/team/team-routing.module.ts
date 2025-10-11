import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamListComponent } from '../../components/team/team-list/team-list.component';
import { TeamCreateComponent } from '../../components/team/team-create/team-create.component';

const routes: Routes = [
  { path: '', component: TeamListComponent },
  { path: 'create', component: TeamCreateComponent },
  { path: 'update/:uuid', component: TeamCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
