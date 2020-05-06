$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}

	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateItemForm();

	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var method = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PaymentService",
		type : method,
		data : $("#formItem").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onItemSaveComplete(response.responseText, status);
		}
	});
});

// UPDATE==========================================
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
	$("#formItem")[0].reset();
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

function validateItemForm() {
	// Card Number
	if ($("#cardNo").val().trim() == "") {
		return "Insert Card Number.";
	}
	//length validate
	if ($("#cardNo").val().length > 5){
		return "The Card Number you entered exceed the length"
	}
	if ($("#cardNo").val().length < 5){
		return "The Card Number you entered Doesn't meet the length"
	}
	
	// NAME
	if ($("#nameOnCard").val().trim() == "") {
		return "Insert the Name on Card.";
	}

	// PRICE-------------------------------
	if ($("#expDate").val().trim() == "") {
		return "Insert Expiry Date.";
	}


	// DESCRIPTION------------------------
	if ($("#cvc").val().trim() == "") {
		return "Insert CVC Number.";
	}
	// is numerical value
	var tmpDesc = $("#cvc").val().trim();

	if (!$.isNumeric(tmpDesc)) {
		return "Insert a numerical value for CVC Number.";
	}

	return true;
}