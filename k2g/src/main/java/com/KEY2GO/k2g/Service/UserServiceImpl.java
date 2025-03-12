package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.User;
import com.KEY2GO.k2g.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> findByRole(String role) {
        return userRepository.findByRole(role);
    }

    @Transactional
    @Override
    public User updateUser(int id, User updateuserdetails) {
        return userRepository.findById(id).map(user -> {
            if (updateuserdetails.getAddress() != null) {
                user.setAddress(updateuserdetails.getAddress());
            }
            if (updateuserdetails.getPhone() != null) {
                user.setPhone(updateuserdetails.getPhone());
            }
            if (updateuserdetails.getUsername() != null) {
                user.setUsername(updateuserdetails.getUsername());
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public User authenticate(String email, String password) {
        User authUser = userRepository.findByEmail(email);
        if (authUser != null && (password.equals(authUser.getPassword())))
            return authUser;
        return null;
    }
}
