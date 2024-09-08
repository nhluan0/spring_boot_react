package luan.datve.dulich.controller;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import luan.datve.dulich.dto.request.CommentRequest;
import luan.datve.dulich.dto.response.CommentResponse;
import luan.datve.dulich.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/comment")
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentController {
    CommentService commentService;

    // add new Comment
    @PostMapping
    public ResponseEntity<?> addNewComment(@RequestBody CommentRequest commentRequest){
        CommentResponse commentResponse = null;
        commentResponse = commentService.saveComment(commentRequest);
        if(commentResponse == null)
            return new ResponseEntity<>("ko luu duoc comment", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(commentResponse,HttpStatus.CREATED);
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllComment(){
        List<CommentResponse> commentResponses = new ArrayList<>();
        commentResponses = commentService.getAllComment();
        if(commentResponses.isEmpty())
            return new ResponseEntity<>("Loi ko lay duoc comment",HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(commentResponses);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentByTourId(@PathVariable("id") Long id){
        List<CommentResponse> commentResponses = new ArrayList<>();
        commentResponses = commentService.getCommentByTourId(id);
        if(commentResponses.isEmpty())
            return new ResponseEntity<>("ko tiem thay comment trong tour",HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(commentResponses);
    }
}
