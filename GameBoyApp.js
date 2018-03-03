function find_closest_palette_color(greyscale)
{
	const colors = [0,85,170,255];
	for (i=0;i<4;i++)
	{
		if (greyscale<=colors[i]) return colors[i];
	}
}

$ ().ready (function () {

	// function draw(id) 
	// {
	// 	var full_code = $('#' + id).val();
	// 	if (!$.isNumeric(full_code)) return;
		
	// 	var code = full_code;
	// 	var chiffre = 0;

	// 	if (code.length==12) 
	// 	{
	// 		code = '0' + code;
	// 	}

	// 	if (!(code.length==8 || code.length==13)) return; 

	// 	if (code.length==13) 
	// 	{
	// 		chiffre = code.substr(0,1);
	// 		code = code.substr(1);	
	// 	}

	// 	// console.log(chiffre, is_odd[chiffre]);
	// 	var inf = marker[0];
	// 	for (var i=0; i<code.length; i++) 
	// 	{
	// 		if (i==parseInt((code.length+1)/2, 10))
	// 		{
	// 			inf += marker[1];
	// 		}
	// 		if (i<(code.length/2)) 
	// 		{
	// 			var is_odd_chiffre = is_odd[chiffre];
	// 			// console.log('is_odd', i, is_odd_chiffre[i]);
	// 			if (is_odd_chiffre[i]==0)
	// 			{
	// 				inf += left_even[code[i]];
	// 			}
	// 			else 
	// 			{
	// 				inf += left_odd[code[i]];
	// 			}
	// 		}
	// 		else
	// 		{ 
	// 			inf += right_even[code[i]];
	// 		} 
	// 	}
	// 	inf += marker[2];
	// 	// console.log('inf', inf, inf.length);

	// 	// console.log("draw");
	// 	var line_width = 4;
	// 	var new_width = inf.length * line_width;
	// 	var new_height = 120;

	// 	// console.log("canvas_"+id);
	// 	var canvas = document.getElementById("canvas_"+id);
	// 	var context = canvas.getContext("2d");

	// 	canvas.width = new_width;
	// 	canvas.height = new_height;

	// 	context.fillStyle="#FFFFFF";
	// 	context.fillRect(0,0,new_width,new_height);

	// 	for (var i=0; i<inf.length; i++) 
	// 	{
	// 		if (inf[i]=='1') 
	// 		{
	// 			context.fillStyle="#000000";
	// 			context.fillRect(i*line_width,0,line_width,new_height-19);
	// 		}
	// 	}

	// 	context.font="14px Verdana";
	// 	// console.log('id: ', id.substr(31));
	// 	var category_name = $('#input_product_name').val();
	// 	var product_name = $('#input_variation_name_'+id.substr(31)).val();

	// 	context.fillText(full_code + ' - ' + category_name + ' - ' + product_name , 5, new_height - 5);

	// 	var img = document.getElementById("img_"+id);
	// 	img.src = canvas.toDataURL("image/jpeg");
	// }

	function supports_canvas() 
	{
		return !!document.createElement('canvas').getContext;
	}

	if (supports_canvas()) 
	{
		console.log("Supports canvas");
	}
	else 
	{
		console.log("Canvas not supported");
	}

	var fileInput = document.getElementById('imageFile');
	fileInput.onchange = function() 
	{
		var file = fileInput.files[0];
		$('#upload_img').hide();
		// MegaPixImage constructor accepts File/Blob object.
		var mpImg = new MegaPixImage(file);
		var orientation = 1;

		var reader2 = new FileReader ();
		reader2.onloadend = function(e) 
		{
			var exif = EXIF.readFromBinaryFile(new BinaryFile(e.target.result));
			orientation = exif.Orientation;

			var resCanvas = document.getElementById('resultCanvas');
			mpImg.render(resCanvas, { maxWidth: 160, orientation: orientation });
			mpImg.onrender = function (target) 
			{
				url = resCanvas.toDataURL("image/jpeg");
				var tmpCtx = resCanvas.getContext('2d');
				var imgd = tmpCtx.getImageData(0, 0, 1, 1);
				// var pix = imgd.data;

				console.log(
					imgd.data,
					resCanvas.width, 
					resCanvas.height, 
					tmpCtx
				);

				// Get the CanvasPixelArray from the given coordinates and dimensions.
				var x = 0;
				var y = 0;

				var width = resCanvas.width;
				var height = resCanvas.height;

				var imgd = tmpCtx.getImageData(x, y, width, height);
				tmpCtx.imageSmoothingEnabled= false;
				var pix = imgd.data;

				// greyscaling
				for (var i = 0, n = pix.length; i < n; i += 4) 
				{
					var oldpixel = (pix[i]+pix[i+1]+pix[i+2]) / 3;
					pix[i  ] = oldpixel; // red
				    pix[i+1] = oldpixel; // green
				    pix[i+2] = oldpixel; // blue
				}

				// Loop over each pixel and invert the color.
				for (var i = 0, n = pix.length; i < n; i += 4) 
				{
					var oldpixel = pix[i];
					var newpixel = find_closest_palette_color(oldpixel);
					var quant_error = oldpixel - newpixel;

					pix[i  ] = newpixel; // red
				    pix[i+1] = newpixel; // green
				    pix[i+2] = newpixel; // blue
				    
				    if (
				    	i+4 <= pix.length && // out of pixels
				    	parseInt(i/width) == parseInt((i+4)/width) // out of line
			    	) {
				    	pix[i+4] += quant_error * 7 / 16;
				    }

				    if (
				    	(i-4 > 0) &&
				    	(i-4+width <= pix.length)
			    	) {
				    	pix[i+width-4] += parseInt(quant_error * 3 / 16);
				    }

				    if (
				    	(i+width) <= pix.length
			    	) {
				    	pix[i+width] += parseInt(quant_error * 5 / 16);
				    }

				    if (
				    	(i+4+width) <= pix.length
			    	) {
				    	pix[i+4+width] += parseInt(quant_error * 1 / 16);
				    }
				    

					// console.log(ix, iy);
					// oldpixel        = pixel[x][y];
					// newpixel        = find_closest_palette_color (oldpixel);
					// pixel[x][y]     = newpixel;
					// quant_error     = oldpixel - newpixel;
					// pixel[x+1][y  ] = pixel[x+1][y  ] + quant_error * 7 / 16;
					// pixel[x-1][y+1] = pixel[x-1][y+1] + quant_error * 3 / 16;
					// pixel[x  ][y+1] = pixel[x  ][y+1] + quant_error * 5 / 16;
					// pixel[x+1][y+1] = pixel[x+1][y+1] + quant_error * 1 / 16;

				    // pix[i  ] = pix[i]; // red
				    // pix[i+1] = pix[i+1]; // green
				    // pix[i+2] = pix[i+2]; // blue
				    // pix[i+3] = 255; // alpha
				    // i+3 is alpha (the fourth element)
				}

				// Draw the ImageData at the given (x,y) coordinates.
				tmpCtx.imageSmoothingEnabled= false;
				tmpCtx.putImageData(imgd, x, y);
				tmpCtx.imageSmoothingEnabled= false;

				var reader = new FileReader ();
				reader.onload = function (e) {
					console.log('ready!');
					// var data = new FormData();
					// data.append ("action", "upload");
					// data.append ("ajax-uploadimage", encodeURIComponent(url));

					// $.ajax ({
					//     timeout: 120000,
					//     type : "POST", 
					//     async : false,
					//     contentType : 'multipart/form-data',
					//     url : "../files_for_admin_and_browser/imgSelect/inc/imgSelect.php",
					//     data : data,
					//     cache: false,
					//     contentType: false,
					//     processData: false,
					//     success: function (response) {
					//         var jsn = $.parseJSON (response);
					//         console.log (jsn);
					//         document.getElementById('input_picture').value = jsn.data;
					//         $('#lbl_uploaded_img').val('wird hochgeladen.');
					//         $('#uploaded_img').attr ("src", url);
					//         $('#uploaded_img').load(function() {
					//             $('#uploaded_img').show();
					//         }); 
					  
					//     }
					// });
				};
				reader.readAsDataURL (file);
			};
		};
		reader2.readAsBinaryString (file);
	};

	console.log(find_closest_palette_color(0));
});