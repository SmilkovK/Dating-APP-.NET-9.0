using System;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private IMemberRepository? _memberRepositroy;
    private ILikesRepository? _likesRepositroy;
    private IMessageRepository? _messageRepository;
    public IMemberRepository MemberRepository => _memberRepositroy
        ??= new MemberRepository(context);

    public IMessageRepository MessageRepository => _messageRepository
        ??= new MessageRepository(context);

    public ILikesRepository LikesRepository => _likesRepositroy
        ??= new LikesRepository(context);

    public async Task<bool> Complete()
    {
        try
        {
            return await context.SaveChangesAsync() > 0;
        }
        catch (DbUpdateException ex)
        {
            throw new Exception("Error occured while saving changes", ex);
        }
    }
    public bool HasChanges()
    {
        return context.ChangeTracker.HasChanges();
    }
}
