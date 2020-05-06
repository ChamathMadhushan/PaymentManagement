<%@page import="com.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Management</title>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/payment.js"></script>

</head>
<body>
<div class="container">
	<div class="row">
		<div class="col-6">
			<h1>Payment Management</h1>
			
			<form id="paymentForm" name="paymentForm" method="post" action="payment.jsp">

				Card Number:
				<input id="cardNo" name="cardNo" type="text" class="form-control form-control-sm">
				<br>
				 
				Name on Card:
				<input id="nameOnCard" name="nameOnCard" type="text" class="form-control form-control-sm">
				<br>
				
				Expiry Date:
				<input id="expDate" name="expDate" type="text" class="form-control form-control-sm">
				<br>
				 
				CVC Number:
				<input id="cvc" name="cvc" type="text" class="form-control form-control-sm">
				<br>
				
				<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
				<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
			</form>
			
			<div id="alertSuccess" class="alert alert-success"></div>
			<div id="alertError" class="alert alert-danger"></div>
			<br>

			<div id="divItemsGrid">
				<%
					Payment payObj = new Payment();
					out.print(payObj.readPayment());
				%>
			</div>
			
		</div>
	</div>
</div>
</body>
</html>