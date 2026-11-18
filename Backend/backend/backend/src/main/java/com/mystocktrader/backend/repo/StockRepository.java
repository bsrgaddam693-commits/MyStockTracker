package com.mystocktrader.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mystocktrader.backend.model.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {

}
