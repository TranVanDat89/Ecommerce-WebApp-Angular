import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/admin/user/user.component';
import { BlogComponent } from './components/admin/blog/blog.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { OrderAdminComponent } from './components/admin/order-admin/order-admin.component';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { UpdateArticleComponent } from './components/admin/update-article/update-article.component';
import { CommentComponent } from './components/admin/comment/comment.component';
import { MyCommentComponent } from './components/my-comment/my-comment.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { CreateProductComponent } from './components/admin/product-admin/create-product/create-product.component';
import { UpdateProductComponent } from './components/admin/product-admin/update-product/update-product.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "articles",
    component: ArticleComponent
  },
  {
    path: "articles/category/:categoryId",
    component: ArticleComponent
  },
  {
    path: 'articles/article-detail/:articleId',
    component: ArticleDetailComponent
  }, {
    path: 'comments/my-comments/:userId',
    component: MyCommentComponent
  },
  {
    path: "products",
    component: ProductComponent,
  },
  {
    path: "products/category/:categoryId",
    component: ProductComponent,
  }, {
    path: 'products/product-detail/:productId',
    component: ProductDetailComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }, {
    path: "activate-account",
    component: ActivateAccountComponent
  },
  {
    path: "product-detail",
    component: ProductDetailComponent
  },
  {
    path: "orders",
    component: OrderComponent
  },
  {
    path: 'orders/order-detail/:userId',
    component: OrderDetailComponent
  },
  {
    path: "user-profile",
    component: UserProfileComponent
  },
  {
    path: "favorites",
    component: WishListComponent
  },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' }, {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "users",
        component: UserComponent
      }, {
        path: "blogs",
        component: UpdateArticleComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      }, {
        path: "orders",
        component: OrderAdminComponent
      },
      {
        path: "products",
        component: ProductAdminComponent
      }, {
        path: 'products/create-product',
        component: CreateProductComponent
      }
      , {
        path: 'products/update-product',
        component: UpdateProductComponent
      },
      {
        path: "categories",
        component: CategoryComponent
      }, {
        path: "comments",
        component: CommentComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
