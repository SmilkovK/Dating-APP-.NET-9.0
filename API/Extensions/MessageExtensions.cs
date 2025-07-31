using System;
using System.Linq.Expressions;
using API.DTO;
using API.Entities;

namespace API.Extensions;

public static class MessageExtensions
{
    public static MessageDTO ToDto(this Message message)
    {
        return new MessageDTO
        {
            Id = message.Id,
            SenderId = message.SenderId,
            SenderDisplayName = message.Sender.DisplayName,
            SenderImageUrl = message.Sender.ImageUrl,
            RecipientId = message.RecipientId,
            RecipientDisplayName = message.Recipient.DisplayName,
            RecipientImageUrl = message.Recipient.ImageUrl,
            Content = message.Content,
            DateRead = message.DateRead,
            MessageSend = message.MessageSend
        };
    }

    public static Expression<Func<Message, MessageDTO>> ToDtoProjection()
    {
        return message => new MessageDTO
        {
            Id = message.Id,
            SenderId = message.SenderId,
            SenderDisplayName = message.Sender.DisplayName,
            SenderImageUrl = message.Sender.ImageUrl,
            RecipientId = message.RecipientId,
            RecipientDisplayName = message.Recipient.DisplayName,
            RecipientImageUrl = message.Recipient.ImageUrl,
            Content = message.Content,
            DateRead = message.DateRead,
            MessageSend = message.MessageSend
        };
    }
}
