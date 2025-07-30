import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Member, MemberParams } from '../../../types/member';
import { MemberCard } from "../member-card/member-card";
import { PaginatedResult } from '../../../types/pagination';
import { Paginator } from "../../../shared/paginator/paginator";
import { FilterModal } from '../filter-modal/filter-modal';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModal],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit {
  @ViewChild('filterModal') modal!: FilterModal;
  private memberService = inject(MemberService);
  protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);
  protected memberParamas = new MemberParams();
  private updatedParams = new MemberParams();

  constructor(){
    const filters = localStorage.getItem('filters');
    if(filters){
      this.memberParamas = JSON.parse(filters);
      this.updatedParams = JSON.parse(filters);
    }
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.memberParamas).subscribe({
      next: result => {
        this.paginatedMembers.set(result);
      }
    });
  }

  onPageChange(event: {pageNumber: number, pageSize: number}){
    this.memberParamas.pageNumber = event.pageNumber;
    this.memberParamas.pageSize = event.pageSize;
    this.loadMembers();
  }

  openModal(){
    this.modal.open();
  }

  onClose(){
    console.log('Modal closed')
  }

  onFilterChange(data: MemberParams){
    this.memberParamas = {...data};
    this.updatedParams = {...data};
    this.loadMembers();
  }

  resetFilters(){
    this.memberParamas = new MemberParams();
    this.updatedParams = new MemberParams();
    this.modal.setFilters(this.updatedParams);
    this.loadMembers();
  }

  get displayMessage(): string {
    const defaultParams = new MemberParams();

    const filters: string[] = [];

    if(this.updatedParams.gender){
      filters.push(this.updatedParams.gender + 's')
    }else{
      filters.push('Males, Females');
    }

    if(this.updatedParams.minAge !== defaultParams.minAge || this.updatedParams.maxAge !== defaultParams.maxAge){
      filters.push(` ages ${this.updatedParams.minAge}-${this.updatedParams.maxAge}`)
    }

    filters.push(this.updatedParams.orderBy === 'lastActive' ? 'Recently active' : 'Newest members');

    return filters.length > 0 ? `Selcted ${filters.join('  | ')}` : 'All members';
  }
}
