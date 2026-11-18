package com.mystocktrader.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ipoName;
    private double issuePrice;
    private int lotsApplied;
    private double applicationAmount;
    private String allotmentStatus;
    private String refundStatus;
    private double listingPrice;

    public Ipo() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIpoName() {
        return ipoName;
    }

    public void setIpoName(String ipoName) {
        this.ipoName = ipoName;
    }

    public double getIssuePrice() {
        return issuePrice;
    }

    public void setIssuePrice(double issuePrice) {
        this.issuePrice = issuePrice;
    }

    public int getLotsApplied() {
        return lotsApplied;
    }

    public void setLotsApplied(int lotsApplied) {
        this.lotsApplied = lotsApplied;
    }

    public double getApplicationAmount() {
        return applicationAmount;
    }

    public void setApplicationAmount(double applicationAmount) {
        this.applicationAmount = applicationAmount;
    }

    public String getAllotmentStatus() {
        return allotmentStatus;
    }

    public void setAllotmentStatus(String allotmentStatus) {
        this.allotmentStatus = allotmentStatus;
    }

    public String getRefundStatus() {
        return refundStatus;
    }

    public void setRefundStatus(String refundStatus) {
        this.refundStatus = refundStatus;
    }

    public double getListingPrice() {
        return listingPrice;
    }

    public void setListingPrice(double listingPrice) {
        this.listingPrice = listingPrice;
    }
}
