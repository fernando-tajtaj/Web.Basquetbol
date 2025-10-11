import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PlayerListComponent } from '../../components/player/player-list/player-list.component';
import { PlayerCreateComponent } from '../../components/player/player-create/player-create.component';

import { PlayerRoutingModule } from './player-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PlayerRoutingModule,
    PlayerListComponent,
    PlayerCreateComponent,
  ],
})
export class PlayerModule {}
