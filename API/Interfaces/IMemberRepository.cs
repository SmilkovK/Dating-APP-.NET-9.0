using System;
using API.Entities;

namespace API.Interfaces;

public interface IMemberRepository
{
    void Update(Member member);
    Task<bool> SaveALLAsync();
    Task<IReadOnlyList<Member>> GetMemberAsync();
    Task<Member?> GetMemerByIdAsync(string id);
    Task<IReadOnlyList<Photo>> GetPhotoForMemberAsync(string memberId);
    Task<Member?> GetMemberForUpdate(string id);
}
