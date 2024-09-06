package luan.datve.dulich.mapper;

import luan.datve.dulich.dto.request.RegisterRequest;
import luan.datve.dulich.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MapperRegister {
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "isLock",ignore = true)
    @Mapping(target = "roles",ignore = true)
    User toUser(RegisterRequest request);
}
