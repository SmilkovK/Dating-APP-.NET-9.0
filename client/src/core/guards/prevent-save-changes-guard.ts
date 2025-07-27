import { CanDeactivateFn } from '@angular/router';
import { Member } from '../../types/member';
import { MemberProfile } from '../../features/members/member-profile/member-profile';

export const preventSaveChangesGuard: CanDeactivateFn<MemberProfile> = (component) => {
  if(component.editForm?.dirty){
    return confirm("Are you sure you want to continue? All unsaved changes will be lost")
  }

  return true;
};
