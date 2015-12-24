package org.elsysbg.ip.java;

import java.util.LinkedList;
import java.util.List;

public class ListExample {
	public static void main(String[] args) {
		final List<String> invited = new LinkedList<String>();
		
		invited.add("Ivan");
		invited.add("Peter");
		
		for (String name : invited) {
			System.out.println(name + " is invited");
		}

		System.out.println("All invited: " +
			invited.size());
		
		invited.remove("Ivan");
		
		System.out.println("Ivan is no longer invited");
		
		for (String name : invited) {
			System.out.println(name + " is invited");
		}
		System.out.println("All invited: " +
			invited.size());
	}
}
