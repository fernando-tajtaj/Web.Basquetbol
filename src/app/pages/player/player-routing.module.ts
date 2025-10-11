import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from '../../components/player/player-list/player-list.component';
import { PlayerCreateComponent } from '../../components/player/player-create/player-create.component';

const routes: Routes = [
  { path: '', component: PlayerListComponent },
  { path: 'create', component: PlayerCreateComponent },
  { path: 'update/:uuid', component: PlayerCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}
