package luan.datve.dulich.service;

import luan.datve.dulich.dto.request.CommentRequest;
import luan.datve.dulich.dto.response.CommentResponse;

import java.util.List;

public interface CommentService {
    // save comment
    CommentResponse saveComment(CommentRequest commentRequest);
    List<CommentResponse> getAllComment();
    List<CommentResponse> getCommentByTourId(Long id);
}
