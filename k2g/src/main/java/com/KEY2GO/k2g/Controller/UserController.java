package com.KEY2GO.k2g.Controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import com.KEY2GO.k2g.Entity.Car;
import com.KEY2GO.k2g.Entity.User;
import com.KEY2GO.k2g.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RequestMapping("/api/users")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") int id) {
        Optional<User> car = userService.getUserById(id);
        return car.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public User findUserByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/role/{role}")
    public List<User> findByRoll(@PathVariable("role") String role) {
        return userService.findByRole(role);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody User logInUser) {
        try{
            User user = userService.authenticate(logInUser.getEmail(),logInUser.getPassword());
            System.out.println(user);
            if (user != null)
                return ResponseEntity.ok(user);
        }catch(RuntimeException e){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Add new User from SignUp.js
    @PostMapping("/addUser")
    public User saveUser(@RequestBody User user) {
        return userService.addUser(user);
    }


    @PostMapping("/addEmployee")
    public User saveEmployee(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<?> updateUser(@PathVariable ("id")int id,@RequestBody User userDetails) {
        try {
            User updateUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updateUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}

