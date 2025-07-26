import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member, Photo } from '../../types/member';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  private baseURL = environment.apiUrl;

  getMembers(){
    return this.http.get<Member[]>(this.baseURL + 'members')
  }
  getMember(id: string){
    return this.http.get<Member>(this.baseURL + 'members/' + id);
  }
  getMemberPhotos(id: string){
    return this.http.get<Photo[]>(this.baseURL + 'members/' + id + '/photos')
  }
}
