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

const routes: Routes = [
  { path: '', component: VisitorComponent ,
    children: [
      {
        path: 'home', component: HomeComponent ,
      },
      {
        path: 'login', component: LoginComponent ,
      },
      {
        path: 'syllabi', component: ListSyllabusComponent ,
      }
    ]
  },

  { path: 'admin', component: AdminComponent ,
    children:[
      {
        path: 'users', component: NewUserComponent ,
      },
      {
        path: 'syllabi', component: ListSyllabusComponent ,
      }
    ]
  },


  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
