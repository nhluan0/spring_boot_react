package luan.datve.dulich.mapper;

import luan.datve.dulich.dto.request.CommentRequest;
import luan.datve.dulich.dto.response.CommentResponse;
import luan.datve.dulich.model.Comment;
import luan.datve.dulich.repository.CommentRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MapperComment {
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "tour",ignore = true)
    @Mapping(target = "user",ignore = true)
    @Mapping(target = "dateCreated",ignore = true)
    Comment toComment (CommentRequest commentRequest);
    @Mapping(source = "tour.id",target = "tourId")
    @Mapping(source = "tour.name",target = "tourName")
    @Mapping(source = "user.userName",target = "username")
    @Mapping(source = "dateCreated",target = "dateCreated")
    @Mapping(source = "rate",target = "rate")
    CommentResponse toCommentResponse(Comment comment);
}
