package com.mystocktrader.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mystocktrader.backend.model.Stock;
import com.mystocktrader.backend.repo.StockRepository;
import com.mystocktrader.backend.exception.ResourceNotFoundException;

@Service
@Transactional
public class StockService {

    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public Stock addStock(Stock stock) {
        stock.setId(null);
        return stockRepository.save(stock);
    }

    @Transactional(readOnly = true)
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Stock getStockById(Long id) {
        return stockRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Stock not found with ID: " + id));
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        Stock existingStock = getStockById(id);

        existingStock.setStockName(updatedStock.getStockName());
        existingStock.setSymbol(updatedStock.getSymbol());
        existingStock.setExchange(updatedStock.getExchange());
        existingStock.setQuantity(updatedStock.getQuantity());
        existingStock.setAverageBuyPrice(updatedStock.getAverageBuyPrice());

        return stockRepository.save(existingStock);
    }

    public void deleteStock(Long id) {
        Stock existingStock = getStockById(id);
        stockRepository.delete(existingStock);
    }
}