import { SyllabusDetailsComponent } from './pages/syllabi/Syllabus-details/Syllabus-details.component';
import { PoesComponent } from './pages/poes/poes.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { MappingComponent } from './pages/syllabi/mapping/mapping.component';
import { ProfGuard } from './guards/prof.guard';
import { ProfessorComponent } from './views/professor/professor.component';
import { AdminGuard } from './guards/admin.guard';
import { NewSyllabusComponent } from './pages/syllabi/new-syllabus/new-syllabus.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { PortfolioListComponent } from './pages/portfolios/portfolio-list/portfolio-list.component';
import { ManageSyllabiComponent } from './pages/syllabi/manage-syllabi/manage-syllabi.component';
import { NewSemesterComponent } from './pages/semesters/new-semester/new-semester.component';
import { NewCourseComponent } from './pages/courses/new-course/new-course.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { ListSyllabusComponent } from './pages/syllabi/list-syllabus/list-syllabus.component';
import { Routes, RouterModule } from '@angular/router';
import { UserFormModalComponent } from './pages/modal/user-form-modal/user-form-modal.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { VisitorComponent } from './views/visitor/visitor.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'syllabi',
        component: ListSyllabusComponent,
      },
      {
        path: 'syllabi/:href',
        component: SyllabusDetailsComponent,
      },
      {
        path: 'poes',
        component: PoesComponent,
      },
      {
        path: 'missions',
        component: MissionsComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'users',
        component: NewUserComponent,
      },
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
      },
      {
        path: 'courses',
        component: NewCourseComponent,
      },
      {
        path: 'semesters',
        component: NewSemesterComponent,
      },
      {
        path: 'syllabi',
        component: ListSyllabusComponent,
      },
      {
        path: 'mapping',
        component: MappingComponent,
      },
      {
        path: 'manage_syllabi',
        component: ManageSyllabiComponent,
      },
      {
        path: 'new_syllabus',
        component: NewSyllabusComponent,
      },
      {
        path: 'portfolios',
        component: PortfolioListComponent,
      },
      {
        path: 'user_profile/:email',
        component: UserProfileComponent,
      },
    ],
  },
  {
    path: 'prof',
    component: ProfessorComponent,
    canActivate: [ProfGuard],
    children: [
      {
        path: 'syllabi',
        component: ListSyllabusComponent,
      },
    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
