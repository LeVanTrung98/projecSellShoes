$(document).ready(function(){

	$.ajaxSetup({

		headers:
		{
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr("content")
		}
	});

	$('.notification').hide();

	// start add image
	$('#save').click(function(e){
		e.preventDefault();
		var name = $('#formImage input[name="name"]').val();
		var product_id = $('#formImage select[name="product_id"]').val();
		var img = $('#image')[0].files[0];
		var data_form = new FormData();
		data_form.append('name',name);
		data_form.append('image',img);
		data_form.append('product_id',product_id);
		$.ajax({
			url:'/admin/image',
			type:"POST",
			data:data_form,
			contentType : false,
            processData : false,
			success:function(data){
				console.log(data);
				if(data != undefined && data.errors !=undefined ){
					$.each(data['errors'], function(key, value){
						$('.notification').show();
						$('.mess').append(value+'<br>');
					});
				}
				else{
					alert(data.dataSuccess)
				}
				$("#table_Cate").load(' #table_Cate');
				$("#pageAdd").load(" #pageAdd");
			},
			error:function(error,data){
				console.log(data);
				$('.mess').html("ERROR!!!");
			}
		});

	});  
	// end add


	// start delete
	$(document).on('click', '.delete_Cate',function(e){
		e.preventDefault();
		var curent =$(this);
		console.log(curent);
		if(confirm("Bạn có muốn xóa?")){
			var id=curent.attr("data-id");
			$.ajax({
				url:'/admin/image/'+id,
				type: 'DELETE',
				dataType:'json',
				success:function(data){
					alert(data.dataSuccess);
					$("#table_Cate").load(" #table_Cate");
					$("#pageAdd").load(" #pageAdd");
				},
				error:function(error){
					alert("ERROR!!!");
				}
			});
		}


	});

	// end delete
	

	// start update image
		$(document).on('click','.edit_Cate' ,function(){
			var id = $(this).attr("data-id");
			var name = $(this).attr("data-name");
			$('.notification').hide();

			$.ajax({
				url:'/admin/image/show/'+id,
				type:'GET',
				dataType:'json',
				data:{
				},
				success:function(data){
					$('#editImage input[name="name"]').val(data.name);
					$('#editImage select[name="product_id"]').val(data.product_id);
				}

			});

			$('#save_Edit_Cate').on("click", function(){
				var name = $('#editImage input[name="name"]').val();
				var product_id = $('#editImage select[name="product_id"]').val();
				var img = $('#img')[0].files[0];
				var data_form1 = new FormData();
				data_form1.append('name',name);
				data_form1.append('image',img);
				data_form1.append('product_id',product_id);
				$.ajax({
					url:'/admin/image/upload/'+id,
					type:'POST',
					processData:false,
					contentType:false,
					data:data_form1,
					success:function(data){
						console.log(data);
						if(data != undefined && data.errors !=undefined){
							$.each(data['errors'],function(key, value){
								console.log(value)
								$('.notification').show();
								$('.mess').append(value+'<br>');
							});
						}else{
							alert(data.dataSuccess);
						}
					}
				});
		});

	});
});

