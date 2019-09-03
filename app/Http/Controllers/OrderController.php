<?php

namespace App\Http\Controllers;

use App\Order;
use App\Size;
use App\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    

    // approve order form users
    public function approveOrder(Request $request){
        $id = $request->get('id');
        $quantity = explode(';', $request->get('quantity'));
        $product =explode(';', $request->get('product'));
        $size = explode(';', $request->get('size'));

        for ($i=0; $i <count($product)-1 ; $i++) { 
            $price=Product::findOrFail($product[$i]);
            foreach ($price->sizes as $key => $value) {
                if($size[$i]==$value->pivot->size_id){
                    $sl[$i]=$value->pivot->quantity;
                    if($quantity[$i]<$sl){
                        $newQuantity[$i] = $sl[$i]-$quantity[$i];
                        $update[$size[$i]]=['quantity'=>$newQuantity[$i]];
                    }else{
                        $result="số lượng trong kho không đủ";
                        break;
                    }
                }
            }
            if(count($update)>0){
                $price->sizes()->syncWithoutDetaching($update);
                $order =Order::findOrFail($id); 
                $order['status']=2;
                $order->save();
                $result="Thêm mới thành công vào order";
            }
        }   
        return response()->json($result);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $order = Order::where('status','=',1)->paginate(7);
        $size = Size::all();
        foreach ($order as $key => $value) {
            $order2=$value->products;
            foreach ($order2 as $key => $value) {
                $order3=$value->pivot->status;
            }
        }
         $list  = Order::where('status','=',2)->paginate(7);
        return view('admin.listOrder',compact('order','size','list'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        if($order->delete()){
           $order->products()->detach();
           $result="Đã loại bỏ đơn hàng";
        }
        return response()->json($result);
    }
}
