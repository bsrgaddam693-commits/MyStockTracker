package com.operators;

import java.util.Scanner;

//arithmetic operators
public class TestArithmeticoperatorsDemo1 {

	public static void main(String[] args) {

		System.out.println("main method started");

		Scanner sc = new Scanner(System.in);

		System.out.println("Enter a Value:");
		int a = sc.nextInt();

		System.out.println("Enter b value:");
		int b = sc.nextInt();

		System.out.println("Addition of two numbers:" + (a + b));

		System.out.println("Difference of two numbers:" + (a - b));

		System.out.println("Multiplication of two numbers:" + a * b);

		System.out.println("Division  of two numbers:" + a / b);

		System.out.println("Modulas of two numbvers:" + a % b);

	}
}
