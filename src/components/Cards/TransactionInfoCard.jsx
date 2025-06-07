import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils, LuCreditCard, LuWallet, LuSmartphone, LuBanknote } from 'react-icons/lu'

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  paidVia,
  hideDeleteBtn,
  onDelete
}) => {
  const getAmountStyles = () => 
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
  
  const getPaidViaIcon = (paymentMethod) => {
    switch(paymentMethod) {
      case "Credit Card":
        return <LuCreditCard size={14} />;
      case "Debit Card":
        return <LuCreditCard size={14} />;
      case "UPI":
        return <LuSmartphone size={14} />;
      case "Cash":
        return <LuBanknote size={14} />;
      default:
        return <LuWallet size={14} />;
    }
  }

  const getPaidViaColor = (paymentMethod) => {
    switch(paymentMethod) {
      case "Credit Card":
        return "text-blue-600 bg-blue-50";
      case "Debit Card":
        return "text-purple-600 bg-purple-50";
      case "UPI":
        return "text-orange-600 bg-orange-50";
      case "Cash":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  }

  // Check if icon is an emoji (string) or image URL
  const isEmoji = (str) => {
    return typeof str === 'string' && str.length <= 4 && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(str);
  }
  
  return (
    <>
      <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
          {icon ? (
            isEmoji(icon) ? (
              <span className="text-2xl">{icon}</span>
            ) : (
              <img src={icon} alt={title} className="w-6 h-6" />
            )
          ) : (
            <LuUtensils />
          )}
        </div>
        
        <div className='flex-1 flex items-center justify-between'>
          <div className="flex-1">
            <p className='text-sm text-gray-700 font-medium'>{title}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className='text-xs text-gray-400'>{date}</p>
              {type === "expense" && paidVia && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getPaidViaColor(paidVia)}`}>
                    {getPaidViaIcon(paidVia)}
                    <span>{paidVia}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className='flex items-center gap-2'>
            {!hideDeleteBtn && onDelete && (
              <button 
                className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer p-1 rounded hover:bg-red-50'
                onClick={onDelete}
              >
                <LuTrash2 size={18} />
              </button>
            )}

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
              <h6 className='text-xs font-medium'>
                {type === "income" ? "+" : "-"} ₹{amount}
              </h6>
              {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionInfoCard