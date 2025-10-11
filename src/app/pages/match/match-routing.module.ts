import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchListComponent } from '../../components/match/match-list/match-list.component';
import { MatchCreateComponent } from '../../components/match/match-create/match-create.component';

const routes: Routes = [
  { path: '', component: MatchListComponent },
  { path: 'create', component: MatchCreateComponent },
  { path: 'update/:uuid', component: MatchCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchRoutingModule {}
