import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member, Photo } from '../../types/member';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  private baseURL = environment.apiUrl;
  editMode = signal(false);
  member = signal<Member | null>(null);

  getMembers(){
    return this.http.get<Member[]>(this.baseURL + 'members')
  }
  getMember(id: string){
    return this.http.get<Member>(this.baseURL + 'members/' + id).pipe(
      tap(member =>{
        this.member.set(member)
      })
    )
  }
  
  getMemberPhotos(id: string){
    return this.http.get<Photo[]>(this.baseURL + 'members/' + id + '/photos')
  }

  updateMember(member: EditableMember){
    return this.http.put(this.baseURL + 'members', member)
  }

  uploadPhoto(file: File){
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post<Photo>(this.baseURL + 'members/add-photo' , formData)
  }

  setMainPhoto(photo: Photo){
    return this.http.put(this.baseURL + 'members/set-main-photo/' + photo.id, {})
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseURL + 'members/delete-photo/' + photoId)
  }
}
