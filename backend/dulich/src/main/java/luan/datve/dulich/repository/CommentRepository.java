package luan.datve.dulich.repository;

import luan.datve.dulich.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByTourId(Long id);
}
