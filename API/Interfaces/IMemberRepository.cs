using System;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMemberRepository
{
    void Update(Member member);
    Task<PaginationResult<Member>> GetMembersAsync(MemberParams memberParams);
    Task<Member?> GetMemerByIdAsync(string id);
    Task<IReadOnlyList<Photo>> GetPhotoForMemberAsync(string memberId);
    Task<Member?> GetMemberForUpdate(string id);
}
