import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from '../../components/report/report.component';
import { roleGuard } from '../../core/role.guard';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
