import { Component, inject } from '@angular/core';
import { AdminService } from '../../core/services/admin-service';
import { AccountService } from '../../core/services/account-service';
import { UserManagement } from "./user-management/user-management";
import { PhotoManagement } from './photo-management/photo-management';

@Component({
  selector: 'app-admin',
  imports: [UserManagement, PhotoManagement],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  protected adminService = inject(AdminService)
  protected accountService = inject(AccountService)
  activeTab = 'photos';
  tabs = [
    {label: 'Photo moderation', value: 'photos'},
    {label: 'User Management', value: 'roles'}
  ]

  setTab(tab: string){
    this.activeTab = tab;
  }
}
