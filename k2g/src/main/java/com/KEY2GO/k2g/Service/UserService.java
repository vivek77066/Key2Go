package com.KEY2GO.k2g.Service;

import com.KEY2GO.k2g.Entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User addUser(User user);

    public Optional<User> getUserById(int id);

    public List<User> getAllUsers();

    public User updateUser(int id, User user);

    public void deleteUser(int id);

    public User getUserByEmail(String email);

    public List<User> findByRole(String role);

    public User authenticate(String email, String password);
}
