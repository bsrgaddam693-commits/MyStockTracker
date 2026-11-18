package com.mystocktrader.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mystocktrader.backend.model.Ipo;
import com.mystocktrader.backend.service.IpoService;

@RestController
@RequestMapping("/api/ipos")
public class IpoController {

    private final IpoService ipoService;

    public IpoController(IpoService ipoService) {
        this.ipoService = ipoService;
    }

    @PostMapping
    public ResponseEntity<Ipo> addIPO(@RequestBody Ipo ipo) {
        Ipo savedIPO = ipoService.addIPO(ipo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedIPO);
    }

    @GetMapping
    public ResponseEntity<List<Ipo>> getAllIPOs() {
        return ResponseEntity.ok(ipoService.getAllIPOs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ipo> getIPOById(@PathVariable Long id) {
        return ResponseEntity.ok(ipoService.getIPOById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ipo> updateIPO(
            @PathVariable Long id,
            @RequestBody Ipo ipo) {
        return ResponseEntity.ok(ipoService.updateIPO(id, ipo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIPO(@PathVariable Long id) {
        ipoService.deleteIPO(id);
        return ResponseEntity.noContent().build();
    }
}