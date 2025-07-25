using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public async Task<IReadOnlyList<Member>> GetMemberAsync()
    {
        return await context.Members.ToListAsync();
    }

    public async Task<Member?> GetMemerByIdAsync(string id)
    {
        return await context.Members.FindAsync(id);
    }

    public async Task<IReadOnlyList<Photo>> GetPhotoForMemberAsync(string memberId)
    {
        return await context.Members.Where(x => x.Id == memberId)
        .SelectMany(x => x.Photos).ToListAsync();
    }

    public async Task<bool> SaveALLAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Member member)
    {
        context.Entry(member).State = EntityState.Modified;
    }
}
