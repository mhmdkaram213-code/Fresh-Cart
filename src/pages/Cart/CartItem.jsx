import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, updateQuantity, removeFromCart, cartLoading }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex justify-between items-center gap-4 hover:shadow-md transition-shadow">

      {/* Product Information */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div
          onClick={() => navigate(`/products/${item.product?._id}`)}
          className="w-20 h-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-gray-50"
        >
          <img
            src={item.product?.imageCover}
            alt={item.product?.title}
            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            onClick={() => navigate(`/products/${item.product?._id}`)}
            className="text-sm font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-primary-600 transition-colors"
          >
            {item.product?.title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">{item.product?.category?.name}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-primary-600 font-extrabold text-base">
              {item.price * item.count} EGP
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              {item.price} EGP / unit
            </span>
          </div>
        </div>
      </div>

      {/* Controls & Actions */}
      <div className="flex items-center gap-6">

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          <button
            onClick={() => {
              if (item.count === 1) {
                removeFromCart(item.product?._id);
              } else {
                updateQuantity(item.product?._id, item.count - 1);
              }
            }}
            disabled={cartLoading}
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-600 transition-all active:scale-95 disabled:opacity-50"
            title={item.count === 1 ? "Remove item" : "Decrease quantity"}
          >
            <i className={`fa-solid ${item.count === 1 ? 'fa-trash-can text-xs' : 'fa-minus text-[10px]'}`}></i>
          </button>

          <span className="w-4 text-center text-sm font-black text-gray-800">
            {item.count}
          </span>

          <button
            onClick={() => updateQuantity(item.product?._id, item.count + 1)}
            disabled={cartLoading}
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-all active:scale-95 disabled:opacity-50"
            title="Increase quantity"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
          </button>
        </div>

        {/* Removal Button */}
        <button
          onClick={() => removeFromCart(item.product?._id)}
          disabled={cartLoading}
          className="w-9 h-9 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50"
          title="Remove from cart"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
