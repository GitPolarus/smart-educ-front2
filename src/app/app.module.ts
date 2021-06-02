import { SyllabusDetailsComponent } from './pages/syllabi/Syllabus-details/Syllabus-details.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { PoesComponent } from './pages/poes/poes.component';
import { ListSyllabusComponent } from './pages/syllabi/list-syllabus/list-syllabus.component';
import { MappingComponent } from './pages/syllabi/mapping/mapping.component';
import { NewSyllabusComponent } from './pages/syllabi/new-syllabus/new-syllabus.component';
import { UserProfileComponent } from './pages/users/user-profile/user-profile.component';
import { PortfolioListComponent } from './pages/portfolios/portfolio-list/portfolio-list.component';
import { ManageSyllabiComponent } from './pages/syllabi/manage-syllabi/manage-syllabi.component';
import { NewSemesterComponent } from './pages/semesters/new-semester/new-semester.component';
import { NewCourseComponent } from './pages/courses/new-course/new-course.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserFormModalComponent } from './pages/modal/user-form-modal/user-form-modal.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { AppRoutingModule } from './app-routing.module';
import { VisitorComponent } from './views/visitor/visitor.component';
import { LoaderComponent } from './pages/loader/loader.component';
import { LoginComponent } from './pages/login/login.component';

import { MenuItem } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { loaderInterceptorProviders } from './services/loader-interceptor.service';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './views/admin/admin.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {FileUploadModule} from 'primeng/fileupload';
import {TooltipModule} from 'primeng/tooltip';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {ChartModule} from 'primeng/chart';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { ProfessorComponent } from './views/professor/professor.component';
import { ProfSyllabiComponent } from './pages/syllabi/prof-syllabi/prof-syllabi.component';
import { NewCourseAssessmentComponent } from './pages/course-assessment/new-course-assessment/new-course-assessment.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    VisitorComponent,
    PageNotFoundComponent,
    NewUserComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    AdminComponent,
    HomeComponent,
    NewCourseComponent,
    NewSemesterComponent,
    ManageSyllabiComponent,
    PortfolioListComponent,
    UserProfileComponent,
    NewSyllabusComponent,
    MappingComponent,
    ListSyllabusComponent,
    SyllabusDetailsComponent,
    PoesComponent,
    MissionsComponent,
    DashboardAdminComponent,
    ProfessorComponent,
    ProfSyllabiComponent,
    NewCourseAssessmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    MenubarModule,
    SidebarModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    TabMenuModule,
    CheckboxModule,
    RippleModule,
    RadioButtonModule,
    AvatarGroupModule,
    AvatarModule,
    PasswordModule,
    MenuModule,
    PanelMenuModule,
    MegaMenuModule,
    BreadcrumbModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ProgressSpinnerModule,
    DialogModule,
    PanelModule,
    ContextMenuModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    DropdownModule,
    InputNumberModule,
    StepsModule,
    FieldsetModule,
    ChipsModule,
    AutoCompleteModule,
    FileUploadModule,
    TooltipModule,
    PdfViewerModule,
    ChartModule,
  ],
  providers: [loaderInterceptorProviders, authInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
