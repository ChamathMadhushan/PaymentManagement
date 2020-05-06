<!-- IT17186216_COORAY B C R M
 -->
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

<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<!-- Bootstrap Date-Picker Plugin -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

<script>
    $(document).ready(function(){
      var date_input=$('input[name="expDate"]');
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm-yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);
    })
</script>

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
				<input id="expDate" name="expDate" type="text" placeholder="Select Month & Year" class="form-control form-control-sm">
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
<!-- IT17186216_COORAY B C R M -->