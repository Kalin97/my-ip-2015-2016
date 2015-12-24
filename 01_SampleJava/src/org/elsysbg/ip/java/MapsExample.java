package org.elsysbg.ip.java;

import java.util.HashMap;
import java.util.Map;

public class MapsExample {
	public static void main(String[] args) {
		final Map<String, Integer> nameToCountMap =
			new HashMap<String, Integer>();
		
		nameToCountMap.put("Ivan", 1);
		
		System.out.println(nameToCountMap.get("Ivan"));

		if (nameToCountMap.get("Unknown") == null) {
			System.out.println("Not found");
		}
	}
}
