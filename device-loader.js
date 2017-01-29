
//your device list:
//var dataURL = 'https://raw.githubusercontent.com/wdsx/remotecodechallenge/master/devices.json';

//my modified device list including several invalid devices
var dataURL ='https://raw.githubusercontent.com/ThisAndyMason/InterviewProject/master/devices.json';

//ajax call to load JSON data
$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: dataURL,
		dataType: "json",
		success: function(data) {processData(data);}
	});
	
});


//story 3 data validation function
function dataValidation(objToValidate,indexToValidate)
{
	var isValid = 1;
	
	//test brand & model combination are unique
		//i realise this would be very inefficient for a large number of devices however it keeps the logic simple and is fast for current device set
	for(var i = 0; i<objToValidate.length;i++)
	{
		if(indexToValidate != i && objToValidate[indexToValidate].brand + objToValidate[indexToValidate].model == objToValidate[i].brand + objToValidate[i].model)
		{
			isValid = 0;
		}
	}
	
	//brand is filled  in - max length 50 characters
	if(objToValidate[indexToValidate].brand.length < 1 || objToValidate[indexToValidate].brand.length > 50)
	{
		isValid = 0;
	}
	
	//model is filled  in - max length 50 characters
	if(objToValidate[indexToValidate].model.length < 1 || objToValidate[indexToValidate].model.length > 50)
	{
		isValid = 0;
	}
	
	//form factor oneof the following "CANDYBAR", "SMARTPHONE", "PHABLET", "CLAMSHELL"
	var formArray = ["CANDYBAR","SMARTPHONE","PHABLET","CLAMSHELL"]
	var inFormArray = 0;
		for(var i = 0; i<formArray.length;i++)
		{
			if(objToValidate[indexToValidate].formFactor == formArray[i])
			{
				inFormArray = 1;
			}		
		}
		if (inFormArray == 0)
		{
			isValid = 0;
		}
	//if attributes exist
	if (typeof objToValidate[indexToValidate].attributes !== 'undefined') {
		//if attributes name and value exists for all attributes
		for(var i = 0; i<objToValidate[indexToValidate].attributes.length;i++) 
		{
			var deviceAttributeName = objToValidate[indexToValidate].attributes[i].name;
			var deviceAttributeValue = objToValidate[indexToValidate].attributes[i].value;
			
			if(typeof deviceAttributeName !== 'undefined' && typeof deviceAttributeValue !== 'undefined')
			{
				//then they must have more than 0 characters and less than 20 for name and 100 for value
				if(deviceAttributeName.length < 1 || deviceAttributeName.length >20 || deviceAttributeValue.length < 1 || deviceAttributeValue.length >100)
				{
					isValid = 0;
				}
			}
			else
			{
				isValid = 0;
			}
		}
	}
	console.log( objToValidate[indexToValidate].brand + objToValidate[indexToValidate].model + ' '+isValid)
	return isValid;
}


//main function where data is processed and pushed to HTML
function processData(JSONObj) {

	var deviceArray = [];
	var invalidDeviceArray = [];

	//story 3 implementation
	for(var i = 0; i< JSONObj.length; i++)
	{
		//only load valid devices, push non-valid to an array
		if(dataValidation(JSONObj,i) == 1)
		{
		deviceArray.push(JSONObj[i]);
		}
		else
		{
			invalidDeviceArray.push(JSONObj[i]);
		}
	}
	
	//write to JSON file for invalid objects
			//did not have time, but here i would write the invalidDeviceArray to a new JSON file as an error log




	//takes an array index and prints a list element based on the device data at that index
	function printDeviceByArrayPosition(pos){
		$('#deviceStore ul').append('<li id="li'+pos+'" class="list-group-item"><p><span><b>'+deviceArray[pos].brand+'  '+deviceArray[pos].model+'  </b></span>  <span style="padding-left: 5px;">   (' +deviceArray[pos].formFactor+')</span></p></li>');
		
		for(var j=0; j<deviceArray[pos].attributes.length; j++)
		{
			$('#li'+pos).append('<p style="padding-left: 15px;"><span class="glyphicon glyphicon-menu-right" aria-hidden="true">  </span>'+deviceArray[pos].attributes[j].name+': '+deviceArray[pos].attributes[j].value+'</p>');
		}
	}
	
	
	
	
	//story 1 - returning all loaded devices on click request
	$('#loadAll').click( function showAllDevices()
		{
			$('#deviceStore ul').empty();
			for(var i = 0; i< deviceArray.length; i++)
			{
				printDeviceByArrayPosition(i);
			}
		}
	);




	//stories 2 and 4 - search by "model brand" or by "model" or "brand"
	$('#searchBar').keypress(function(e) {

		if(e.which == 13) {
			$('#deviceStore ul').empty();
			
			var searchEntry = $('#searchBar').val().toLowerCase();
			if (searchEntry.length < 3)
			{
				alert("Please enter a search string of more than 2 characters.");
			}
			//ensure search strings are less than the maximum possible; i.e. 50 for brand + 50 for model + 1 for a space
			else if(searchEntry.length > 101)
			{
				alert("Please enter a search string of less than 101 characters.");
			}
			else
			{
				for(var i = 0; i< deviceArray.length; i++)
				{
					var deviceBrand = deviceArray[i].brand.toLowerCase();
					var deviceModel = deviceArray[i].model.toLowerCase();
					
					if(deviceBrand.indexOf(searchEntry) != -1)
					{
						printDeviceByArrayPosition(i);
					}
					else if(deviceModel.indexOf(searchEntry) != -1)
					{
						printDeviceByArrayPosition(i);
					}
					else if(searchEntry == deviceBrand+' '+deviceModel)
					{
						printDeviceByArrayPosition(i);
					}
				}
			}
			e.preventDefault();
		}
	});
	
};











