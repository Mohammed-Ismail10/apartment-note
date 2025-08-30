const ApartmentList = ({ apartments, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-EG').format(price) + ' جنيه'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG')
  }

  if (apartments.length === 0) {
    return (
      <div className="no-apartments">
        <p>لا توجد شقق مسجلة بعد</p>
      </div>
    )
  }

  return (
    <div className="apartment-list">
      {apartments.map(apartment => (
        <div key={apartment.id} className="apartment-card">
          <div className="apartment-header">
            <h3>{apartment.area}</h3>
            <div className="apartment-actions">
              <button 
                onClick={() => onEdit(apartment)}
                className="btn btn-edit"
                title="تعديل"
              >
                ✏️
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('هل أنت متأكد من حذف هذه الشقة؟')) {
                    onDelete(apartment.id)
                  }
                }}
                className="btn btn-delete"
                title="حذف"
              >
                🗑️
              </button>
            </div>
          </div>

          <div className="apartment-details">
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">السعر:</span>
                <span className="detail-value price">{formatPrice(apartment.price)}</span>
              </div>

              {apartment.floor > 0 && (
                <div className="detail-item">
                  <span className="detail-label">الدور:</span>
                  <span className="detail-value">{apartment.floor}</span>
                </div>
              )}

              {apartment.size > 0 && (
                <div className="detail-item">
                  <span className="detail-label">المساحة:</span>
                  <span className="detail-value">{apartment.size} م²</span>
                </div>
              )}

              {apartment.rooms > 0 && (
                <div className="detail-item">
                  <span className="detail-label">الغرف:</span>
                  <span className="detail-value">{apartment.rooms}</span>
                </div>
              )}

              {apartment.bathrooms > 0 && (
                <div className="detail-item">
                  <span className="detail-label">دورات المياه:</span>
                  <span className="detail-value">{apartment.bathrooms}</span>
                </div>
              )}

              {apartment.livingRooms > 0 && (
                <div className="detail-item">
                  <span className="detail-label">قطع الصالة:</span>
                  <span className="detail-value">{apartment.livingRooms}</span>
                </div>
              )}

              <div className="detail-item">
                <span className="detail-label">التواصل:</span>
                <span className="detail-value contact">{apartment.contact}</span>
              </div>
            </div>

            <div className="apartment-features">
              <span className={`feature ${apartment.isFinished ? 'positive' : 'negative'}`}>
                {apartment.isFinished ? '✅ مشطبة' : '❌ غير مشطبة'}
              </span>
              <span className={`feature ${apartment.hasElevator ? 'positive' : 'negative'}`}>
                {apartment.hasElevator ? '🛗 يوجد مصعد' : '🚶 لا يوجد مصعد'}
              </span>
            </div>

            {apartment.notes && (
              <div className="apartment-notes">
                <span className="notes-label">ملاحظات:</span>
                <p className="notes-text">{apartment.notes}</p>
              </div>
            )}

            <div className="apartment-meta">
              <span className="created-date">
                تم الإضافة: {formatDate(apartment.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ApartmentList
