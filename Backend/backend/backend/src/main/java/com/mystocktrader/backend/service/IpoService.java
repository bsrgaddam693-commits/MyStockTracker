package com.mystocktrader.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mystocktrader.backend.model.Ipo;
import com.mystocktrader.backend.repo.IpoRepo;
import com.mystocktrader.backend.exception.ResourceNotFoundException;

@Service
@Transactional
public class IpoService {

    private final IpoRepo ipoRepository;

    public IpoService(IpoRepo ipoRepository) {
        this.ipoRepository = ipoRepository;
    }

    public Ipo addIPO(Ipo ipo) {
        ipo.setId(null);
        return ipoRepository.save(ipo);
    }

    @Transactional(readOnly = true)
    public List<Ipo> getAllIPOs() {
        return ipoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Ipo getIPOById(Long id) {
        return ipoRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "IPO not found with ID: " + id));
    }

    public Ipo updateIPO(Long id, Ipo updatedIPO) {
        Ipo existingIPO = getIPOById(id);

        existingIPO.setIpoName(updatedIPO.getIpoName());
        existingIPO.setIssuePrice(updatedIPO.getIssuePrice());
        existingIPO.setLotsApplied(updatedIPO.getLotsApplied());
        existingIPO.setApplicationAmount(updatedIPO.getApplicationAmount());
        existingIPO.setAllotmentStatus(updatedIPO.getAllotmentStatus());
        existingIPO.setRefundStatus(updatedIPO.getRefundStatus());
        existingIPO.setListingPrice(updatedIPO.getListingPrice());

        return ipoRepository.save(existingIPO);
    }

    public void deleteIPO(Long id) {
        Ipo existingIPO = getIPOById(id);
        ipoRepository.delete(existingIPO);
    }
}