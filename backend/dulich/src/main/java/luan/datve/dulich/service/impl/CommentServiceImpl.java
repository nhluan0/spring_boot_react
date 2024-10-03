package luan.datve.dulich.service.impl;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import luan.datve.dulich.dto.request.CommentRequest;
import luan.datve.dulich.dto.response.CommentResponse;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.mapper.MapperComment;
import luan.datve.dulich.model.Comment;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.CommentRepository;
import luan.datve.dulich.repository.TourRepository;
import luan.datve.dulich.repository.UserRepository;
import luan.datve.dulich.service.CommentService;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentServiceImpl implements CommentService {
    CommentRepository commentRepository;
    MapperComment mapperComment;
    TourRepository tourRepository;
    UserRepository userRepository;

    // luu comment moi
    @Override
    public CommentResponse saveComment(CommentRequest commentRequest) {
        // kiem tra user co trong database ko
        User user = userRepository.findByUserName(commentRequest.getUsername());
        if(user == null) throw new ResourceNotExceptionFound("user ko ton tai");
        // kiem tra tour co ton tai ko
        Tour tour = tourRepository.findById(commentRequest.getTourId())
                .orElseThrow(()-> new ResourceNotExceptionFound("Tour ko ton tai"));

        // set data comment
        Comment comment = mapperComment.toComment(commentRequest);
        comment.setTour(tour);
        comment.setUser(user);
        Date date = new Date(new java.util.Date().getTime());
        comment.setDateCreated(date);
        // luu vao database
        Comment commentSaved = commentRepository.save(comment);
        // chuyen doi thanh commentResponse
        CommentResponse commentResponse = mapperComment.toCommentResponse(commentSaved);
        return commentResponse;
    }

    // lay tat ca comment
    @Override
    public List<CommentResponse> getAllComment() {
        return commentRepository.findAllByOrderByDateCreatedDesc().stream().map((comment)->{
            return mapperComment.toCommentResponse(comment);
        }).collect(Collectors.toList());
    }


    // get comment by tour id
    @Override
    public List<CommentResponse> getCommentByTourId(Long id) {
        return commentRepository.findByTourIdOrderByDateCreatedDesc(id).stream().map(comment ->{
            return mapperComment.toCommentResponse(comment);
        }).collect(Collectors.toList());
    }
}
