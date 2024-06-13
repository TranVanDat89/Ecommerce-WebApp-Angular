import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/admin/user/user.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { OrderAdminComponent } from './components/admin/order-admin/order-admin.component';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { BlockParameter } from '@angular/compiler';
import { BlogComponent } from './components/admin/blog/blog.component';
import { ArticleComponent } from './components/article/article.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HtmlEditorService, ImageService, LinkService, QuickToolbarService, RichTextEditorModule, TableService, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CategoryComponent } from './components/admin/category/category.component';
import { UpdateArticleComponent } from './components/admin/update-article/update-article.component';
import { CommentComponent } from './components/admin/comment/comment.component';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { MyCommentComponent } from './components/my-comment/my-comment.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { CreateProductComponent } from './components/admin/product-admin/create-product/create-product.component';
import { UpdateProductComponent } from './components/admin/product-admin/update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    OrderDetailComponent,
    UserProfileComponent,
    WishListComponent,
    AdminComponent,
    UserComponent,
    HeaderAdminComponent,
    OrderAdminComponent,
    ProductAdminComponent,
    BlogComponent,
    ArticleComponent,
    ArticleDetailComponent,
    DashboardComponent,
    CategoryComponent,
    UpdateArticleComponent,
    CommentComponent,
    MyCommentComponent,
    ActivateAccountComponent,
    CreateProductComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    AngularEditorModule,
    RichTextEditorModule, // required animations module
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BaseChartDirective,
    DataTablesModule,
    CodeInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
