$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}

	$("#alertError").hide();
	
	$('#cardNo').attr('maxlength', 16);
	
	$('#cvc').attr('maxlength', 16);
	//space by 4 digits
/*	IT17186216_COORAY B C R M
*//*	$('#cardNo').on('keypress change', function () {
		  $(this).val(function (index, value) {
			  return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
		  });
	});*/
	
});

// SAVE IT17186216_COORAY B C R M
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation
	var status = validateItemForm();

	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid
	var method = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PaymentService",
		type : method,
		data : $("#paymentForm").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onItemSaveComplete(response.responseText, status);
		}
	});
});

// UPDATE  IT17186216_COORAY B C R M
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidItemIDSave").val(
					$(this).closest("tr").find('#hidItemIDUpdate').val());
			$("#cardNo").val($(this).closest("tr").find('td:eq(0)').text());
			$("#nameOnCard").val($(this).closest("tr").find('td:eq(1)').text());
			$("#expDate").val($(this).closest("tr").find('td:eq(2)').text());
			$("#cvc").val($(this).closest("tr").find('td:eq(3)').text());
		});

function onItemSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidItemIDSave").val("");
	$("#paymentForm")[0].reset();
}

$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PaymentService",
		type : "DELETE",
		data : "itemID=" + $(this).data("itemid"),
		dataType : "text",
		complete : function(response, status) {
			onItemDeleteComplete(response.responseText, status);
		}
	});
});

function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}
/*IT17186216_COORAY B C R M
*/function validateItemForm() {
	// Card Number
	if ($("#cardNo").val().trim() == "") {
		return "Insert Card Number.";
	}
	
	// is numerical value
	var tmpNo = $("#cardNo").val().trim();
	
	
	if (!$.isNumeric(tmpNo)) {
		return "Insert a numerical value for Card Number.";
	}
	//length validate
	if ($("#cardNo").val().length > 16){
		return "The Card Number you entered exceed the length"
	}
	if ($("#cardNo").val().length < 16){
		return "The Card Number you entered Doesn't meet the length"
	}
	
	// NAME
	if ($("#nameOnCard").val().trim() == "") {
		return "Insert the Name on Card.";
	}

	// EXP date
	if ($("#expDate").val().trim() == "") {
		return "Insert Expiry Date.";
	}


	// CVC
	if ($("#cvc").val().trim() == "") {
		return "Insert CVC Number.";
	}
	// is numerical value
	var tmpCvc = $("#cvc").val().trim();
	$('#cvc').attr('maxlength', 3);
	if (!$.isNumeric(tmpCvc)) {
		return "Insert a numerical value for CVC Number.";
	}
	//length validate
	if ($("#cvc").val().length > 3){
		return "The CVC Number too long."
	}
	if ($("#cvc").val().length < 3){
		return "The CVC Number too short"
	}

	return true;
}