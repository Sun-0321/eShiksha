package com.exam.examportal.service.impl;

import com.exam.examportal.dao.RoleRepository;
import com.exam.examportal.dao.UserRepository;
import com.exam.examportal.helper.UserFoundException;
import com.exam.examportal.model.User;
import com.exam.examportal.model.UserRole;
import com.exam.examportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    //create user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User regUser = userRepository.findByUsername(user.getUsername());
        if(regUser!=null){
//            System.out.println("User is already registered!!");
//            throw new Exception("User already registered!!");
            throw new UserFoundException();
        }
        else{
             for(UserRole usrRl:userRoles){
                 roleRepository.save(usrRl.getRole());
             }
             user.getUserRoles().addAll(userRoles);
             regUser = this.userRepository.save(user);
        }
        return regUser;
    }

    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

}
