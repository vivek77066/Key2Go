package com.KEY2GO.k2g.Repository;

import com.KEY2GO.k2g.Entity.Booking;
import com.KEY2GO.k2g.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.user = :user ORDER BY b.status DESC")
    List<Booking> findByUser(@Param("user") User user);
}
