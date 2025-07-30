import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule, TimeAgoPipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  private accountService = inject(AccountService);
  protected memeberService = inject(MemberService);
  private toast = inject(ToastService);
  protected editableMember: EditableMember = {
    displayName: '',
    descpription: '',
    city: '',
    country: '',
  }

  ngOnInit(): void {
    this.editableMember = {
      displayName: this.memeberService.member()?.displayName || '',
      descpription: this.memeberService.member()?.description || '',
      city: this.memeberService.member()?.city || '',
      country: this.memeberService.member()?.country || '',
    }
  }
  
  updateProfile() {
    if (!this.memeberService.member())
      return;
    const updatedMember = { ...this.memeberService.member(), ...this.editableMember }
    this.memeberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if(currentUser && updatedMember.displayName != currentUser?.displayName){
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.toast.success("Profile Updated Succ")
        this.memeberService.editMode.set(false)
        this.memeberService.member.set(updatedMember as Member)
        this.editForm?.reset(updatedMember)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.memeberService.editMode()) {
      this.memeberService.editMode.set(false);
    }
  }
}
