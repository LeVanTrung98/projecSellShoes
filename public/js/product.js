$(document).ready(function(){

	$.ajaxSetup({

		headers:
		{
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr("content")
		}
	});

	$('.notification').hide();

	$('#save').click(function(e){
		e.preventDefault();
		$('.notification').show();
		$.ajax({
			url: '/admin/product',
			type: 'POST',
			dataType:'json',
			data:{
				'name':$('#addProduct input[name="name"]').val(),
				'status':$('#addProduct input[name="status"]').val(),
				'price':$('#addProduct input[name="price"]').val(),
				'category_id':$('#addProduct select[name="category_id"]').val(),
				'brand_id':$('#addProduct select[name="brand_id"]').val(),
				'size_id':$('#addProduct select[name="size_id"]').val(),
				'quantity':$('#addProduct input[name="quantity"]').val(),
				'description':$('#addProduct textarea[name="description"]').val(),
			},
			success:function(data){
				console.log(data);
				// var mess = data['message'];
				// $('.mess').html(mess);
				
			},
			error:function(error){
				$('.mess').html("ERROR!!!");
			}


		}).done(function(){
			$("#table_Cate").load(' #table_Cate');
			$("#pageAdd").load(" #pageAdd");
		});

	});  
	// end add



	$(document).on('click', '.delete_Cate', function(e){
		e.preventDefault();
		var curent =$(this);
		console.log(curent);
		if(confirm("Bạn có muốn xóa?")){
			var id=curent.attr("data-id");
			$.ajax({
				url:'/admin/product/'+id,
				type: 'DELETE',
				dataType:'json',
				data:{},
				success:function(data){
					console.log(data);
					var mess = data['message'];
					// $('.mess').html(mess);
					alert(mess);
					// $("#table_Cate").reload();
					// location.reload();
					$("#table_Cate").load(" #table_Cate");
					// $(".delete_Cate").load(" .delete_Cate");
					$("#pageAdd").load(" #pageAdd");




					// location.reload('#table_Cate');
					// $(".delete_Cate").load(" .delete_Cate");
					// $("#table_Cate").load();
				},
				error:function(error){
					// $('.mess').html(error);
					alert("ERROR!!!");
				}
			});
		}else{
			return false;
		}

	});

	// end delete
	

		function SaveEdit(){
			$.ajax({
					url:'/admin/category/'+id,
					type:'PUT',
					dataType:'json',
					data:{
						'name': $('#ediCate').val(),
					},
					success:function(data){
						$('.notification').show();
						// console.log(data);
						var mess = data['message'];
						$('.mess').html(mess);
						$("#table_Cate").load(' #table_Cate');
						// location.reload()
					}
				});
		}





		$('.editPro').on("click", function(){
			var id = $(this).attr("data-id");
			console.log(id);

			$.ajax({
				url:'/admin/product/editPro/'+id,
				type:'GET',
				dataType:'json',
				data:{},
				success:function(data){
					$('#formEdit input[name="name"]').val(data['name']);
					$('#formEdit input[name="status"]').val(data['status']);
					$('#formEdit input[name="price"]').val(data['price']);
					$('#formEdit textarea[name="description"]').val(data['description']);
					$('#formEdit select[name="size_id"]').val(data['size_id']);
					$('#formEdit select[name="brand_id"]').val(data['brand_id']);
					$('#formEdit select[name="category_id"]').val(data['category_id']);
				}
			});
			

			$('#save_Edit_Cate').on("click", function(){
			// var form_data = $('#formEdit').serialize();  
			// console.log(form_data);
				$.ajax({
					url:'/admin/product/'+id,
					type:'PUT',
					dataType:'json',
					data:{
						'name':$('#formEdit input[name="name"]').val(),
						'status':$('#formEdit input[name="status"]').val(),
						'price':$('#formEdit input[name="price"]').val(),
						'category_id':$('#formEdit select[name="category_id"]').val(),
						'brand_id':$('#formEdit select[name="brand_id"]').val(),
						'size_id':$('#formEdit select[name="size_id"]').val(),
						'quantity':$('#formEdit input[name="quantity"]').val(),
						'description':$('#formEdit textarea[name="description"]').val(),
					},
					success:function(data){
						$('.notification').show();
						console.log(data);
						var mess = data['message'];
						$('.mess').html(mess);
						$("#table_Cate").load(' #table_Cate');
						// location.reload()
					},
					error:function(error,statusText){
						$('.mess').html("ERROR!!!");
						
					}
				});

		});

		$("#close_Edit").on("click", function(){
			id=null;
		});


	});





		$('.updateQuantity').click(function(){
			var id =$(this).attr("data-id");
			console.log(id);
			$.ajax({
				url:'/admin/product/editPro/'+id,
				type:'GET',
				dataType:'json',
				data:{},
				success:function(data){
					console.log(data);
					$('#formUpdate input[name="name"]').val(data['name']);
					$('#formUpdate select[name="size_id"]').val(data['size_id']);
				}
			});

			$('#updateQuantity').click(function(){

				$.ajax({
					url:'/admin/product/updateQuantity/'+id,
					type:'PUT',
					dataType:'json',
					data:{
						'name':$('#formUpdate input[name="name"]').val(),
						'quantity':$('#formUpdate input[name="quantity"]').val(),
						'size_id':$('#formUpdate select[name="size_id"]').val()
					},
					success:function(data){
						console.log(data);
					}
				});
			});



		});

			
	



		$('.hover').popover({
			content:fetchData,
			html:true,
			trigger:'hover',
			placement:'right'
		});

		function fetchData(){
			var dataShow = "";
			var id = $(this).attr('productID');
			console.log(id);
			$.ajax({
				url:'/admin/product/popover/'+id,
				dataType:'json',
				async:false,
				type:'GET',
				data:{},
				success:function(data){
					dataShow=data;
				}
			});
			return dataShow;
		}



		// var blood =  new Bloodhound({
		// 	remote:{
		// 		url:'/admin/product/search?value=%QUERY%',
		// 		wildcard: '%QUERY%'
		// 	},
		// 	dataTokenizer: Bloodhound.tokenizers.whitespace('value'),
		// 	queryTokenizer: Bloodhound.tokenizers.whitespace
		// });
		var bloodhound = new Bloodhound({
                remote: {
                    url: '/admin/product/search?value=%QUERY%',
                    wildcard: '%QUERY%'
                },
                datumTokenizer: Bloodhound.tokenizers.whitespace('value'),
    			queryTokenizer: Bloodhound.tokenizers.whitespace
            });

		$('#search').typeaheader({
			hint:true,
			highlight:true,
			minLenght:1
		},{

			source: bloodhound.ttAdapter(),
			name: 'product-search',
			display: function(data){
				return data.name;
			},
                templates: {
                    empty: [
                        '<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
                    ],
                    header: [
                        '<div class="list-group search-results-dropdown">'
                    ],
                    suggestion: function(data) {
                    return '<div style="font-weight:normal; margin-top:-10px ! important;" class="list-group-item">' + data.name + '</div></div>'
                    }
                }
		});

});



