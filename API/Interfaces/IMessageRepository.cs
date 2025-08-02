using System;
using API.DTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DelteMessage(Message message);
    Task<Message?> GetMessage(string messageId);
    Task<PaginationResult<MessageDTO>> GetMessagesForMember(MessageParams messageParams);
    Task<IReadOnlyList<MessageDTO>> GetMessageThread(string currentMemberId, string recipientId);
    Task<bool> SaveAllChanges();
    
    void AddGroup(Group group);
    Task RemoveConnection(string connectionId);
    Task<Connection?> GetConnection(string connectionId);
    Task<Group?> GetMessageGroup(string groupName);
    Task<Group?> GetGroupForConnection(string connectionId);
}
