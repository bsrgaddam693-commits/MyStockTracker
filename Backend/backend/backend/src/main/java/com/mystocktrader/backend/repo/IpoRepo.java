package com.mystocktrader.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mystocktrader.backend.model.Ipo;

public interface IpoRepo extends JpaRepository<Ipo, Long> {

}
