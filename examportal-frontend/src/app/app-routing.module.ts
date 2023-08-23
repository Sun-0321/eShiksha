import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { ShowQuizComponent } from './pages/user/show-quiz/show-quiz.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [adminGuard],
    children: [

      {
        path: '',
        component: WelcomeComponent

      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-category',
        component: AddCategoriesComponent
      },
      {
        path: 'quizzes',
        component: ViewQuizComponent
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent
      },
      {
        path: 'view-questions/:id/:title',
        component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-question/:id/:title',
        component: AddQuestionComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [normalGuard],
    children: [
      {
        path: ':catId',
        component: ShowQuizComponent

      },
      {
        path: 'instructions/:quizId',
        component: QuizInstructionsComponent
      },

    ]

  },
  {
    path: 'start/:quizId',
    component: StartComponent,
    canActivate:[normalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
