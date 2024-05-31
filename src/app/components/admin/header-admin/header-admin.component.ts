import { Component } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  isCollapsed: boolean = false;
  isActived: number = 0;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  enableActived(index: number): void {
    this.isActived = index;
  }
}
