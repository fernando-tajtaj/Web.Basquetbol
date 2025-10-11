import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../../components/admin/admin.component';
import { roleGuard } from '../../core/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
