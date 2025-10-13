import { Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { CrudComponent } from './crud/crud.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: "", component: TestComponent
        , children: [
            { path: "page1", component: Page1Component },
            { path: "page2", component: Page2Component },
            { path: "page3", component: Page3Component },
        ]
    },
    { path: "login", component: LoginComponent },
    { path: "Admin", component: CrudComponent },


    { path: '**', component: PageNotFoundComponent }

];
