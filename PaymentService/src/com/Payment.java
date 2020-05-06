package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class Payment {
	private Connection connect()
	{
		Connection con = null;
		
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/payment?serverTimezone=UTC", "root", "");
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return con;
	}
	
	public String readPayment()
	{
		String output = "";
		
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for reading.";
			}
			
			// Prepare the html table to be displayed
			output = "<table border='1'>"
					+ "<tr><th>Card Number</th>"
					+ "<th>Name On Carde</th>"
					+ "<th>Expiry Date</th>"
					+ "<th>CVC Number</th>"
					+ "<th>Update</th>"
					+ "<th>Remove</th></tr>";
	
			String query = "select * from payment";
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			
			// iterate through the rows in the result set
			while (rs.next())
			{
				String pamentID = Integer.toString(rs.getInt("pamentID"));
				String cardNo = rs.getString("cardNo");
				String nameOnCard = rs.getString("nameOnCard");
				String expDate = rs.getString("expDate");
				String cvc = rs.getString("cvc");
				
				// Add into the html table
				output += "<tr><td><input id='hidItemIDUpdate'name='hidItemIDUpdate' type='hidden' value='" + pamentID+ "'>" + cardNo + "</td>";
				output += "<td>" + nameOnCard + "</td>";
				output += "<td>" + expDate + "</td>";
				output += "<td>" + cvc + "</td>";
			
				// buttons
				output += "<td><input name='btnUpdate'type='button' "
						+ "value='Update'class='btnUpdate btn btn-secondary'></td>"
						+ "<td><input name='btnRemove'type='button' "
						+ "value='Remove'class='btnRemove btn btn-danger'data-itemid='"+ pamentID + "'>" + "</td></tr>";
			}
			
			con.close();
			
			// Complete the html table
			output += "</table>";
			
		}
		catch (Exception e)
		{
			output = "Error while reading the items.";
			System.err.println(e.getMessage());
		}
		
		return output;
	}

	
	
	public String insertPayment(String cardNo, String nameOnCard, String expDate, String cvc)
	{
		String output = "";
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for inserting.";
			}
			
			// create a prepared statement
			String query = " insert into payment(`pamentID`,`cardNo`,`nameOnCard`,`expDate`,`cvc`) values (?, ?, ?, ?, ?)";
			
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			// binding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, cardNo);
			preparedStmt.setString(3, nameOnCard);
			preparedStmt.setString(4, expDate);
			preparedStmt.setString(5, cvc);
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			
			String newItems = readPayment();
			output = "{\"status\":\"success\", \"data\": \"" +newItems + "\"}";
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while inserting the item.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	
	
	public String updatePayment(String pamentID, String cardNo, String nameOnCard, String expDate, String cvc)
	{
		String output = "";
		
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for updating.";
			}
			
			// create a prepared statement
			String query = "UPDATE payment SET cardNo=?,nameOnCard=?,expDate=?,cvc=? WHERE pamentID=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			// binding values
			preparedStmt.setString(1, cardNo);
			preparedStmt.setString(2, nameOnCard);
			preparedStmt.setString(3, expDate);
			preparedStmt.setString(4, cvc);
			preparedStmt.setInt(5, Integer.parseInt(pamentID));
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			
			String newItems = readPayment();
			output = "{\"status\":\"success\", \"data\": \"" + newItems + "\"}";
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while updating the item.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
	
	
	
	public String deletePayment(String pamentID)
	{
		String output = "";
		
		try
		{
			Connection con = connect();
			
			if (con == null)
			{
				return "Error while connecting to the database for deleting.";
			}
			
			// create a prepared statement
			String query = "delete from payment where pamentID=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			
			// binding values
			preparedStmt.setInt(1, Integer.parseInt(pamentID));
			
			// execute the statement
			preparedStmt.execute();
			con.close();
			
			String newItems = readPayment();
			output = "{\"status\":\"success\", \"data\": \"" + newItems + "\"}";
		}
		catch (Exception e)
		{
			output = "{\"status\":\"error\", \"data\": \"Error while deleting the item.\"}";
			System.err.println(e.getMessage());
		}
		
		return output;
	}
}
